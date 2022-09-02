import { SafetyCertificateTwoTone } from "@ant-design/icons";
import { async } from "@firebase/util";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FirstPart = ({
  showNamePart,
  setShowNamePart,
  setShowTypePart,
  setProgress,
  errors,
  register,
}) => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Afghanistan");
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      );
      const jsonData = await response.json();
      if (jsonData) {
        setData(await jsonData);
        const uniqueData = [...new Set(data.map((item) => item.country))];
        setCountries(uniqueData.sort());
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
    const cities = data.filter((c) => c.country === selectedCountry);
    setCities(cities.map((c) => c.name).sort());
  }, [data]);

  const handleNext = () => {
    const signUpName = document.getElementById("signUpName").value;
    const signUpEmail = document.getElementById("signUpEmail").value;
    const signUpCountry = document.getElementById("signUpCountry").value;
    const signUpCity = document.getElementById("signUpCity").value;

    if (!signUpName || !signUpEmail || !signUpCountry || !signUpCity) {
      toast.error("Fill up the required fields.", {
        id: "filReqErrT",
      });
      return;
    }

    if (errors.name || errors.country || errors.city || errors.email) {
      return;
    }

    setProgress(2);
    setShowTypePart(true);
    setShowNamePart(false);
  };

  return (
    <div className={`${showNamePart ? "block" : "hidden"}`}>
      <div className="form-control w-full  ">
        <label className="label">
          <span className="label-name">Full Name</span>
        </label>
        <input
          type="text"
          id="signUpName"
          placeholder="Full Name"
          className="input input-bordered w-full"
          {...register("name", {
            required: {
              value: true,
              message: "Name is Required",
            },
          })}
        />
        <label className="label">
          {errors.name?.type === "required" && (
            <span className="label-text-alt text-red-500">
              {errors.name.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control w-full  ">
        <label className="label">
          <span className="label-email">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          id="signUpEmail"
          autoComplete="new-password"
          className="input input-bordered w-full "
          {...register("email", {
            required: {
              value: true,
              message: "Email Is Required",
            },
            pattern: {
              value: /[a-z0-9]+@.[a-z]{3}/,
              message: "Invalid email",
            },
          })}
        />
        <label className="label">
          {errors?.email?.type === "required" && (
            <span className="label-text-alt text-red-500">
              {errors.email.message}
            </span>
          )}
          {errors?.email?.type === "pattern" && (
            <span className="label-text-alt text-red-500">
              {errors.email.message}
            </span>
          )}
        </label>
      </div>

      <div className="lg:grid grid-cols-2 gap-5 mb-5">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-name">Country</span>
          </label>
          <select
            id="signUpCountry"
            {...register("country", {
              required: {
                value: true,
                message: "Country is Required",
              },
            })}
            className="select select-bordered"
            onChange={(e) => setSelectedCountry(e.target.value)}
            value={selectedCountry}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-name">City</span>
          </label>
          <select
            id="signUpCity"
            {...register("city", {
              required: {
                value: true,
                message: "City is Required",
              },
            })}
            className="select select-bordered"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={() => handleNext()} className="btn w-full ">
        Next
      </button>
    </div>
  );
};

export default FirstPart;
