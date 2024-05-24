"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [features, setFeatures] = useState({
    Age: 38,
    Occupation: "14",
    Annual_Income: 10361.92,
    Monthly_Inhand_Salary: 666.493,
    Num_Bank_Accounts: 6,
    Num_Credit_Card: 5,
    Interest_Rate: 32,
    Num_of_Loan: 7,
    Delay_from_due_date: 55,
    Num_of_Delayed_Payment: 21,
    Changed_Credit_Limit: 26.92,
    Num_Credit_Inquiries: 6,
    Credit_Mix: "0",
    Outstanding_Debt: 3293.1,
    Credit_Utilization_Ratio: 37.44,
    Credit_History_Age: 26,
    Payment_of_Min_Amount: "2",
    Total_EMI_per_month: 44.01,
    Amount_invested_monthly: 64.19,
    Payment_Behaviour: "6",
    Monthly_Balance: 248.44,
  });
  const [prediction, setPrediction] = useState(null);
  const [probabilities, setProbabilities] = useState({});

  const creditScoreLabels = ["Good", "Poor", "Standard"];

  const handleChange = (field, value) => {
    setFeatures({
      ...features,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        features,
      });
      console.log(response.data);
      setPrediction(response.data.prediction);
      setProbabilities(response.data.probabilities);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };
  return (
    <main className={styles.main}>
      {" "}
      <form onSubmit={handleSubmit} className="section">
        <label>
          Age:
          <input
            type="number"
            value={features.Age}
            onChange={(e) => handleChange("Age", parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Occupation:
          <select
            value={features.Occupation}
            onChange={(e) => handleChange("Occupation", e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="0">Accountant</option>
            <option value="1">Architect</option>
            <option value="2">Developer</option>
            <option value="3">Doctor</option>
            <option value="4">Engineer</option>
            <option value="5">Entrepreneur</option>
            <option value="6">Journalist</option>
            <option value="7">Lawyer</option>
            <option value="8">Manager</option>
            <option value="9">Mechanic</option>
            <option value="10">Media Manager</option>
            <option value="11">Musician</option>
            <option value="12">Scientist</option>
            <option value="13">Teacher</option>
            <option value="14">Writer</option>
            <option value="15">Other</option>
          </select>
        </label>
        <br />
        <label>
          Annual income:
          <input
            type="number"
            value={features.Annual_Income}
            onChange={(e) =>
              handleChange("Annual_Income", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Monthly inhand salary:
          <input
            type="number"
            value={features.Monthly_Inhand_Salary}
            onChange={(e) =>
              handleChange("Monthly_Inhand_Salary", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Number of bank accounts:
          <input
            type="number"
            value={features.Num_Bank_Accounts}
            onChange={(e) =>
              handleChange("Num_Bank_Accounts", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Number of credit cards:
          <input
            type="number"
            value={features.Num_Credit_Card}
            onChange={(e) =>
              handleChange("Num_Credit_Card", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Interest rate:
          <input
            type="number"
            value={features.Interest_Rate}
            onChange={(e) =>
              handleChange("Interest_Rate", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Number of loans:
          <input
            type="number"
            value={features.Num_of_Loan}
            onChange={(e) =>
              handleChange("Num_of_Loan", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Delay from due date:
          <input
            type="number"
            value={features.Delay_from_due_date}
            onChange={(e) =>
              handleChange("Delay_from_due_date", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Number of delayed payments:
          <input
            type="number"
            value={features.Num_of_Delayed_Payment}
            onChange={(e) =>
              handleChange("Num_of_Delayed_Payment", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Changed credit limit:
          <input
            type="number"
            value={features.Changed_Credit_Limit}
            onChange={(e) =>
              handleChange("Changed_Credit_Limit", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Number of credit inquiries:
          <input
            type="number"
            value={features.Num_Credit_Inquiries}
            onChange={(e) =>
              handleChange("Num_Credit_Inquiries", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Credit Mix:
          <select
            value={features.Credit_Mix}
            onChange={(e) => handleChange("Credit_Mix", e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="0">Bad</option>
            <option value="1">Good</option>
            <option value="2">Mix</option>
            <option value="3">Unknown</option>
          </select>
        </label>

        <br />
        <label>
          Outstanding debt:
          <input
            type="number"
            value={features.Outstanding_Debt}
            onChange={(e) =>
              handleChange("Outstanding_Debt", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Credit utilization ratio:
          <input
            type="number"
            value={features.Credit_Utilization_Ratio}
            onChange={(e) =>
              handleChange("Credit_Utilization_Ratio", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Credit history age (months):
          <input
            type="number"
            value={features.Credit_History_Age}
            onChange={(e) =>
              handleChange("Credit_History_Age", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Payment of minimum amount:
          <select
            value={features.Payment_of_Min_Amount}
            onChange={(e) =>
              handleChange("Payment_of_Min_Amount", e.target.value)
            }
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="0">NM</option>
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </label>

        <br />
        <label>
          Total EMI per month:
          <input
            type="number"
            value={features.Total_EMI_per_month}
            onChange={(e) =>
              handleChange("Total_EMI_per_month", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Amount invested monthly:
          <input
            type="number"
            value={features.Amount_invested_monthly}
            onChange={(e) =>
              handleChange("Amount_invested_monthly", parseInt(e.target.value))
            }
          />
        </label>

        <br />
        <label>
          Payment Behaviour:
          <select
            value={features.Payment_Behaviour}
            onChange={(e) => handleChange("Payment_Behaviour", e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="0">Unknown</option>
            <option value="1">High spent Large value payments</option>
            <option value="2">High spent Medium value payments</option>
            <option value="3">High spent Small value payments</option>
            <option value="4">Low spent Large value payments</option>
            <option value="5">Low spent Medium value payments</option>
            <option value="6">Low spent Small value payments</option>
          </select>
        </label>

        <br />
        <label>
          Monthly balance:
          <input
            type="number"
            value={features.Monthly_Balance}
            onChange={(e) =>
              handleChange("Monthly Balance", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <button
          type="submit"
          className="button button--primary margin-top--sm button--block"
        >
          Predict
        </button>
      </form>
      {prediction && (
        <div className="margin-top--md section" style={{ textAlign: "center" }}>
          <div>
            <h3>Predicted Credit Score</h3>
            <h3>{creditScoreLabels[prediction - 1]}</h3>
            <h3>Probabilities:</h3>
            <ul>
              {Object.entries(probabilities).map(
                ([creditScore, probability]) => (
                  <li key={creditScore}>
                    {creditScoreLabels[parseInt(creditScore) - 1]}:{" "}
                    {probability.toFixed(2)}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
