"use client";

import { useState, useEffect } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';

// Assuming a type for your detection logs
export interface Detection {
  id: string;
  created_at: string;
  label: 'person' | 'vehicle' | 'Tank' | 'Smoke' | 'Ship' | 'object';
  confidence: number;
  feed: 'RGB' | 'IR' | 'FUSED';
  frame: number;
}

export const useDetectionLogs = () => {
  const supabase = createSupabaseBrowser();
  const [logs, setLogs] = useState<Detection[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialLogs = async () => {
      const { data, error } = await supabase
        .from('detections')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) {
        console.error('Error fetching initial logs:', error);
        setError(error.message);
      } else {
        setLogs(data.reverse()); // Reverse to have oldest first for charting
      }
    };

    fetchInitialLogs();

    const channel = supabase
      .channel('detections_realtime')
      .on<Detection>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'detections' },
        (payload) => {
          setLogs((currentLogs) => [...currentLogs, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return { logs, error };
};
