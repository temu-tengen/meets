'use client';

import { useEffect, useState, useTransition } from 'react';
import { voteMeetAction } from '../actions/actions';
import { voteReverseMeetAction } from '../actions/actions';
import styles from './meetviewer.module.css';

interface meetInter {
  title?: string;
  info?: string;
  date?: string;
  owner?: string;
  votes?: number;
  voters?: string[] | null;
  meetid: number; // Changed from meetId to meetid
  currentUsername?: string;
}

export default function MeetViewer({
  title = "",
  info = "",
  date = "",
  owner = "",
  votes = 0,
  voters = [],
  meetid,
  currentUsername = ""
}: meetInter) {
  const [isPending, startTransition] = useTransition();
  const [localVotes, setLocalVotes] = useState(votes);
  const [localVoters, setLocalVoters] = useState<string[]>(Array.isArray(voters) ? voters : []);

  useEffect(() => {
    setLocalVotes(votes);
    setLocalVoters(Array.isArray(voters) ? voters : []);
  }, [votes, voters]);

  const hasVoted = localVoters.includes(currentUsername);

  const handleVote = async () => {
    if (!currentUsername) {
      return;
    }

    startTransition(async () => {
      if (hasVoted) {
        const result = await voteReverseMeetAction(meetid, currentUsername);
        if (result.success) {
          setLocalVotes((prev) => Math.max(prev - 1, 0));
          setLocalVoters((prev) => prev.filter((name) => name !== currentUsername));
        }
      } else {
        const result = await voteMeetAction(meetid, currentUsername);
        if (result.success) {
          setLocalVotes((prev) => prev + 1);
          setLocalVoters((prev) => [...prev, currentUsername]);
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p className={styles.paragraph}>{info}</p>
      <p>Votes: {localVotes}</p>
      <p>Voters: {voters?.join(", ") || "None"}</p>
      <p className={styles.footText}>Owner: {owner}</p>
      <p className={styles.footText}>Date: {date}</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleVote();
        }}
      >
        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? 'Voting...' : hasVoted ? 'Undo Vote' : `Vote (${localVotes})`}
        </button>
      </form>
    </div>
  );
}
