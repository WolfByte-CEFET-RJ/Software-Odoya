import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./Relatorios.module.scss";
import { TbArrowDownDashed } from "react-icons/tb";
import Header from "../../components/Header";
import api from "../../api.js";
import { UserContext } from "../../components/Context/userContext";
import { toast } from "react-toastify";

const Relatorios = () => {
  const data = [
    {
      name: "Installation & Developers",
      data: [
        43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
        161454, 154610, 168960, 171558,
      ],
    },
    {
      name: "Manufacturing",
      data: [
        24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243,
        31050, 33099, 33473,
      ],
    },
    {
      name: "Sales & Distribution",
      data: [
        11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213,
        25663, 28978, 30618,
      ],
    },
    {
      name: "Operations & Maintenance",
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        11164,
        11218,
        10077,
        12530,
        16585,
      ],
    },
    {
      name: "Other",
      data: [
        21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
        10073, 11471, 11648,
      ],
    },
  ];
  const categories = [
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Exemplo de Line Chart",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: "Valores",
      },
    },
    series: data,
  };

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.ondas_background}>
        <h1 className={styles.titulo_relatorios}>Relatórios</h1>
      </div>
      <img src="/Ondinhas.svg" className={styles.separador} />
      <section className={styles.relatorio}>
        <h2 className={styles.amountDeposits}>
          <TbArrowDownDashed /> Tempo de Enchimento de Ponto de Coleta
        </h2>
        <div className={styles.dispositionRelatorio}>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <div className={styles.displayButtonsReport}>
            <button>Gerar pdf</button>
            <button>Gerar planilha</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Relatorios;
