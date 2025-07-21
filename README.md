# IronEye - AI-Powered EO/IR Vision System

- IronEye is an AI-powered air-to-surface classification system using RGB-IR fusion for military object detection and classification. 

- The system ingests synchronized RGB and IR video streams and applies edge detection to the RGB stream and performs a lightweight fusion onto the IR feed. This enhances object contrast and detail, preparing the data for accurate classification with a single input.

- A custom dataset collected by using War Thunder for simulation was used to train the YOLOv8 model with 1500+ annotated images of Tanks, Ships, Vehicles and People.

- The YOLOv8 claassification system is intgegrated with an MCP Server to control the War Thunder simulation environment to facilitate real-time object detection and classification.

![IronEye Dashboard](/frontend/public/images/ironeye-dash-1.jpeg)

![IronEye Chat](/frontend/public/images/ironeye-chat.jpeg)

![IronEye Analytics](/frontend/public/images/ironeye-analytics.jpeg)

![IronEye Dashboard](/frontend/public/images/ironeye-person.jpeg)

## Features

- **Dual-Stream Data Ingestion**: Synchronized RGB and IR video feed processing
- **Edge-Enhanced Fusion**: Lightweight fusion of RGB edge details onto IR imagery
- **Real-time Object Detection**: YOLOv8-powered classification of fused imagery
- **MCP-Controlled Simulation**: Integration with War Thunder for realistic simulation
- **Live Dashboard**: Real-time monitoring of video streams and analytics
- **AI-Powered Control**: LLM-assisted control of simulation environment using Windows MCP Server
- **Real-time Chat**: Chat interface with Tool Calling for querying details of objects detected in the video stream using Database queries

## Tech Stack

### Frontend
- Next.js 15
- Tailwind CSS
- TypeScript
- WebSockets
- shadcn/ui

### Backend
- FastAPI
- OpenCV
- YOLOv8
- WebSockets

### Database
- Supabase for database and authentication (https://supabase.com/)

### MCP Server
- Windows MCP server for controlling War Thunder

### Simulation
- War Thunder

## Dataset

- Custom Dataset collected using War Thunder for simulation [Dataset Link](https://www.kaggle.com/datasets/iavinash/war-thunder-dataset)


## Project Structure

```
iron-eye/
├── frontend/          # Next.js frontend application
├── backend/           # FastAPI backend service
├── mcp-server/        # MCP server for simulation control
├── model-training/    # Model training
```

## Getting Started

### Prerequisites

- Node.js 18+ & npm
- Python 3.12+
- War Thunder (for simulation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CubeStar1/iron-eye.git
   cd iron-eye
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

5. **Set up the MCP server**
   ```bash
   cd mcp-server
   pip install uv
   uv run main.py
   ```
6. **Setup Supabase**
   - Create a Supabase account and create a new project
   - Copy the migration in frontend/lib/supabase/migrations/ to the SQL editor in Supabase and run it
   - Get the Supabase URL and Supabase Admin key

    
### Running the Application

1. **Start the backend**
- Set environment variables:
    ```bash
    SUPABASE_URL=<your supabase url>
    SUPABASE_ADMIN=<your supabase admin key>
    ```

- Run the backend:
    ```bash
    uvicorn backend.main:app --reload
    ```

2. **Start the frontend**
- Set environment variables:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
    SUPABASE_ADMIN=<your supabase admin key>

    RESEND_API_KEY=<your resend api key>
    RESEND_DOMAIN=<your resend domain>

    NEXT_PUBLIC_APP_NAME=IronEye
    NEXT_PUBLIC_APP_ICON='/logos/aerothon-logo.webp'

    # AI Providers

    OPENAI_API_KEY=<your openai api key>
    GOOGLE_GENERATIVE_AI_API_KEY=<your google generative ai api key>
    XAI_API_KEY=<your xai api key>
    GROQ_API_KEY=<your groq api key>

    # AI Tools
    TAVILY_API_KEY=<your tavily api key>
    RAGIE_API_KEY=<your ragie api key>

    BROWSERBASE_API_KEY=<your browserbase api key>
    BROWSERBASE_PROJECT_ID=<your browserbase project id>

    NEXT_PUBLIC_BACKEND_URL="http://127.0.0.1:8000"
    NEXT_PUBLIC_MCP_URL="http://127.0.0.1:8001/mcp"

    ```

- Start the frontend
    ```bash
    cd frontend
    npm run dev
    ```

3. **Start the MCP server**
    ```bash
    cd mcp-server
    uv run main.py
    ```

## Usage

1. Launch War Thunder and ensure the MCP server is running
2. Access the web dashboard at `http://localhost:3000`
3. View the synchronized RGB and IR video feeds
4. Use the chat interface to control the simulation with natural language
5. Monitor real-time object detection and classification

## How It Works

1. **Dual-Stream Processing**: The system ingests synchronized RGB and IR video streams
2. **Edge Detection**: Applies Sobel filtering to extract edge details from the RGB stream
3. **Image Fusion**: Combines RGB edge information with IR data
4. **Object Detection**: Uses YOLOv8 to detect and classify objects in the fused imagery
5. **Real-time Control**: Enables LLM-assisted control of the simulation environment using a Windows MCP Server. Allows the user to perform actions in the simulation environment using natural language such as "Move to the left, lock on to a target, fire"


## Model Training

- The model was trained using the custom dataset collected using War Thunder for simulation. The dataset was annotated using the YOLOv8 tool.
- To train the model, run the training script in the model-training directory:

   ```bash
   cd model-training
   python training.py
   ```
- The model will be saved in the model-training directory as `yolov8n-custom-run.pt` in the `runs` directory.

## Citation

- Windows MCP (https://github.com/CursorTouch/Windows-MCP)
```


