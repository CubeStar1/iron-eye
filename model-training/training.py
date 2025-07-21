import os
import zipfile
import requests
from pathlib import Path
from tqdm import tqdm
from ultralytics import YOLO

def download_public_dataset(url: str, output_dir: str, extract: bool = True):
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    filename = url.split('/')[-1] + ".zip"
    file_path = output_path / filename
    
    print(f"Downloading dataset from {url}...")
    
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(file_path, 'wb') as f, tqdm(
        desc=filename,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for data in response.iter_content(chunk_size=1024):
            size = f.write(data)
            bar.update(size)
    
    print("Download completed!")
    
    if extract and filename.endswith('.zip'):
        print("Extracting files...")
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall(output_path)
        print("Extraction completed!")

def create_dataset_yaml(output_dir: str, class_names: list):
    yaml_content = f"""# Dataset
path: {os.path.abspath(output_dir) + os.path.sep + "dataset"}
train: images/train
val: images/val

# Classes
nc: {len(class_names)}  # number of classes
names: {class_names}  # class names
"""
    yaml_path = os.path.join(output_dir, "dataset.yaml")
    with open(yaml_path, 'w') as f:
        f.write(yaml_content)
    return yaml_path

def main():
    DATASET_URL = "https://www.kaggle.com/api/v1/datasets/download/iavinash/war-thunder-dataset"
    OUTPUT_DIR = "./datasets"
    CLASS_NAMES = ['Tank', 'Smoke', 'Ship']
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    if DATASET_URL != "":
        download_public_dataset(DATASET_URL, OUTPUT_DIR)
    
    dataset_yaml = create_dataset_yaml(OUTPUT_DIR, CLASS_NAMES)
    
    model = YOLO("yolov8n.pt")
    
    model.train(
        data=dataset_yaml,
        epochs=50,
        imgsz=640,
        batch=16,
        project="./runs",
        name="yolov8n-custom-run",
        verbose=True,
        workers=0
    )

if __name__ == "__main__":
    main()