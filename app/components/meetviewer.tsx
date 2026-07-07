'use client';

import { useTransition } from 'react';
import { voteMeetAction } from '../actions/actions';
import styles from './meetviewer.module.css';

interface meetInter {
  title?: string;
  info?: string;
  date?: string;
  owner?: string;
  votes?: number;
  voters?: string[] | null;
  meetid: number; // Changed from meetId to meetid
}

export default function MeetViewer({ 
  title = "", 
  info = "", 
  date = "", 
  owner = "", 
  votes = 0, 
  voters = [], 
  meetid // Changed to lowercase
}: meetInter) {
  const [isPending, startTransition] = useTransition();
  const voterList = Array.isArray(voters) ? voters : [];

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p className={styles.paragraph}>{info}</p>
      <p>Votes: {votes}</p>
      <p>Voters: {voterList.join(", ") || "None"}</p>
      <p className={styles.footText}>Owner: {owner}</p>
      <p className={styles.footText}>Date: {date}</p>
      
      <form action={async () => {
        startTransition(async () => {
          await voteMeetAction(meetid); 
        });
      }}>
        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? 'Voting...' : `Vote (${votes})`}
        </button>
      </form>
    </div>
  );
}
