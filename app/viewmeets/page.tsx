import styles from "./page.module.css";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import MeetViewer from "../components/meetviewer";
import { getMeetsAction } from "../actions/actions";

export default async function ViewMeetsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session_token");
    const username = cookieStore.get("username")?.value;

    if (!session) {
        redirect("/");
    }

    const meets = (await getMeetsAction()) ?? [];

    return (
        <div className={styles.container}>
            <h1>View Meets</h1>
            {meets.map((meet: any) => {

                return (
                    <MeetViewer
                        key={meet.meetid}
                        meetid={meet.meetid}
                        title={meet.title}
                        info={meet.info}
                        date={meet.date}
                        owner={meet.owner}
                        votes={meet.votes}
                        voters={meet.voters}
                    />
                );
            })}

        </div>
    );
}