"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/test").then((res) =>
      res.json().then((data) => console.log(data, "??????"))
    );
    // fetch("/app/api/test").then((res) =>
    //   res.json().then((data) => console.log(data, "??????"))
    // );

    // fetch("/src/app/api/test").then((res) =>
    //   res.json().then((data) => console.log(data, "??????"))
    // );
    // fetch("/test").then((res) =>
    //   res.json().then((data) => console.log(data, "??????"))
    // );
  }, []);
  return <div>123</div>;
}
