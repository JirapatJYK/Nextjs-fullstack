import { getCookie } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import SelectDropdown from "../components/SelectDropdown";

const Home: NextPage = () => {
  const [list, setList] = useState([
    {
      id: 0,
      value: "Hello World0",
    },
    {
      id: 1,
      value: "Hello World1",
    },
  ]);
  const [isLoading, setIsloading] = useState(true);
  const [count, setCount] = useState(0);
  const [dropdownList, setDropdownList] = useState({
    header: "Gender",
    onSelected: onSelected,
    list: [
      {
        name: "Male",
        id: "0",
      },
      {
        name: "Female",
        id: "1",
      },
    ],
  });
  function onSelected(selected: number) {
    console.log(selected);
  }
  useEffect(() => {
    console.log("Home Component");
    console.log(getCookie("myToken"));
    const timeout = setTimeout(() => {
      setIsloading(false);
    }, 1000);
  });
  return (
    <div
      style={{ backgroundImage: "linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)", backdropFilter: "blur(5px)" }}
    >
      <Head>
        <title>Web App Name</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loader isLoading={isLoading} />
      <Navbar />
      <main className="container">
        <section>
          <div className="container">
            <div className="row">
              <div
                className="col-5 p-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "white"
                }}
              >
                <div className="">
                  <div className="environment"></div>
                  <h1 className="title glitch layers" data-text="INSTEADIZE">
                    <span>INSTEADIZE</span>
                  </h1>
                </div>
                <div className="mt-9">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Pariatur incidunt officiis distinctio magnam, assumenda rem
                    ipsum earum cumque quasi veritatis similique enim,
                    consequuntur eum voluptate ab voluptas! Id, sequi sed!
                  </p>
                </div>
                <table className="mt-4 w-80">
                  <tbody>
                    <tr>
                      <td style={{ color: "white" }}>contract</td>
                      <td style={{ color: "var(--text-secondary)" }}>
                        0xf70F246D961246c9B48dc0D8Cd621986B6919E2C
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-9">
                  <h1 style={{ color: "white" }}>Download now for free</h1>
                  <div className="d-flex mt-2 ">
                    <button className="btn-primary d-flex">
                      <a className="fa fa-2x fa-apple"></a>
                      <a style={{ lineHeight: "28px" }}>ios</a>
                    </button>
                    <button className="btn-primary d-flex">
                      <a className="fa fa-2x fa-android"></a>
                      <a style={{ lineHeight: "28px" }}>Android</a>
                    </button>
                    <button className="btn-primary d-flex">
                      <a className="fa fa-2x fa-warning"></a>
                      <a style={{ lineHeight: "28px" }}>Android</a>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-5 hero"
                style={{
                  backgroundColor: "deepskyblue",
                  position: "relative",
                  padding: "10px",
                }}
              >
                <Image src="/vercel.svg" layout="fill" />
              </div>
            </div>

            <p>
              Get started by editing <code>pages/index.tsx</code>
              <br />
              {getCookie("myToken")}
            </p>
          </div>
        </section>
        <section>
          <div className="container">
            <video controls src="/video0.mp4" width="100%"/>
          </div>
        </section>
        <section className="" style={{ backgroundColor: "" }}>
          <div className="timeline">
            <ul>
              <li>
                <div className="timeline-content">
                  <h2>2022</h2>
                  <p>Story</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h2>2023</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes!
                  </p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h2>2024</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes!
                  </p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h2>2025</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className="main">
            <SelectDropdown {...dropdownList} />
          </div>
        </section>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
