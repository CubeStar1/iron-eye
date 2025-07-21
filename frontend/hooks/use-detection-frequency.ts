"use client";

import { useState, useEffect, useCallback } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';

export interface DetectionFrequency {
  label: string;
  count: number;
  lastDetected: string | null;
}

export const useDetectionFrequency = () => {
  const supabase = createSupabaseBrowser();
  const [frequencies, setFrequencies] = useState<DetectionFrequency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetectionFrequency = useCallback(async () => {
    try {
      setLoading(true);
      
      // First, get the most recent 200 detections
      const { data: recentDetections, error: detectionError } = await supabase
        .from('detections')
        .select('label, created_at')
        .order('created_at', { ascending: false })
        .limit(200);

      if (detectionError) throw detectionError;

      // Process the detections to get frequency counts
      const frequencyMap = new Map<string, { count: number, lastDetected: string | null }>();
      
      recentDetections.forEach(detection => {
        const label = detection.label;
        const current = frequencyMap.get(label) || { count: 0, lastDetected: null };
        frequencyMap.set(label, {
          count: current.count + 1,
          lastDetected: detection.created_at
        });
      });

      // Convert to array and sort by count descending
      const frequencyArray: DetectionFrequency[] = Array.from(frequencyMap.entries())
        .map(([label, { count, lastDetected }]) => ({
          label,
          count,
          lastDetected
        }))
        .sort((a, b) => b.count - a.count);

      setFrequencies(frequencyArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching detection frequency:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch detection frequency');
      setFrequencies([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchDetectionFrequency();
    
    // Set up real-time subscription for new detections
    const channel = supabase
      .channel('detections_frequency_realtime')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'detections' 
        }, 
        () => {
          // Refresh the frequency data when new detections come in
          fetchDetectionFrequency();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchDetectionFrequency, supabase]);

  return { frequencies, loading, error };
};
