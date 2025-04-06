import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Open_Sans } from "next/font/google";
// Remove local font temporarily
import localFont from "next/font/local";

const opensans = Open_Sans({
  subsets: ["latin"],
});



const page = () => {
  return (
    // Use opensans instead of grotesk for now
    <main className={opensans.className}>
      <h1 className="text-center pb-2">hello, i'm <strong>amaan.</strong> glad you're here!</h1>
      <Alert className="text-center">
        <AlertTitle className="text-center flex justify-center pt-2 pb-2">⚠️this site is a work in progress⚠️</AlertTitle>
        <AlertDescription className="text-center flex justify-center items-center">
          Watch your step & Please don't mind the mess🧹
        </AlertDescription>
      </Alert>
      <br />
      
      <p className="text-center">
        im currently a <strong>pre-junior</strong> (university of cincy has a 5 year engineering programme, and pre-junior is like almost over with the third going into their fourth) in <strong>computer engineering</strong>.
        <br />
        <br />
        my interests are in <strong>machine learning</strong>, <strong>deep learning</strong>, <strong>cloud</strong> (engineering  + networking), and <strong>software engineering</strong>. 
        <br />
        <br />
        currently looking for opportunities in <strong>cloud</strong>,<strong> swe</strong>
      </p>
    </main>
  );
};

export default page;
