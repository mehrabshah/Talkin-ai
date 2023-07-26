import styles from "/styles/Shared.module.css";
import { UserProfile } from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";

import { useContext, useEffect, useState } from 'react';


export default function UserProfilePage() {

    const { isLoaded, isSignedIn, user } = useUser();

    const createUser = async () => {
        const newUser = await fetch(`/api/auth/signup?userId=${user?.id}`);
    }
    
    useEffect(() => {
        createUser();
        //fetchUserUsage;
  
     });



return (

    <main className={styles.container}><UserProfile path="/user" routing="path" /></main>
);


}




