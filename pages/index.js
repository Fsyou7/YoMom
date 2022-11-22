import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Yo mama so...</title>     
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Yo mama so...</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an adjective; ie. ugly, fat, stupid"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <p>Rawness</p>
          <input type="range" id="rawness" name="rawness" min="1" max="5" step="1" />
          <input type="submit" value="Start cappin" />
          
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
