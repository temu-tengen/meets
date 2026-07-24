'use client';

import SliderSwitch from "../components/sliderSwitch/sliderswitch";
import styles from "./page.module.css";
import ChatRoom from "../components/chatroom/chatroom";

export default function AnchatPage() {

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Coming Soon</h1>
            <p className={styles.p}>Anchat will be an anonymous chat application, with no guaranteed usernames or identities. It will be public with a single chat room for all users. Release v0.01 will not have moderation, but I am planning to add it in future versions. The planned release time is: </p>
            <p className={styles.p}>Monday, July 13 2026</p>
            <p className={styles.p}>Thanks!</p>
            <SliderSwitch />

            <ChatRoom></ChatRoom>
            
        </div>
    );
}