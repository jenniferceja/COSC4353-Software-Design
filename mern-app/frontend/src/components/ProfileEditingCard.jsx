import { useState } from "react";
import Field from "./Field";
import MultiDatePickerField from "./MultiDatePickerField";
import DropdownMenu from "./DropdownMenu";
import Selector from "./Selector";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton from "./Buttons";
import CommentBox from "./CommentBox";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const skills = [
  "Gardening",
  "Cooking",
  "Cleaning",
  "Baking",
  "Fundraising",
  "Art",
];

const handleStateSelect = (state) => {
  console.log("Selected state:", state);
  // update form input or context state
};

export default function ProfileEditingCard() {
  return (
    <div
      className={`bg-white text-secondary px-4 py-2 rounded border-2 border-solid  w-lg`}
    >
      <form action="" classname={`flex`}>
        <div className={"flex flex-col size-full gap-2"}>
          <div className={"flex flex-3 flex-col gap-2"}>
            {/* <div className="">
            <img src={examplepic} width={200} height={200}></img>
          </div> */}
            <Field
              label="Name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
            <Field
              label="Address 1"
              name="address1"
              type="text"
              placeholder="Penny Lane"
              required
            />
            <div className={"flex gap-4"}>
              <Field
                className={"flex-3"}
                label="Address 2"
                name="address2"
                type="text"
                placeholder="Mailbox 1"
              />
              <Field
                className={"flex-1"}
                label="Zipcode"
                name="zipcode"
                type="number"
                placeholder="12345"
                required
              />
            </div>
            <div className={"flex gap-4"}>
              <Field
                className={"flex-3"}
                label="City"
                name="city"
                type="text"
                placeholder="Albuquerque"
                required
              />
              <div className={"flex-1 self-baseline-last flex-col flex"}>
                <div>
                  State<span className="text-red-500">*</span>
                </div>
                <DropdownMenu items={states} onSelect={handleStateSelect}>
                  State select
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div></div>
          <div className={"flex flex-2 row-span-full gap-4"}>
            <div className={"flex-1 flex flex-col "}>
              <div>
                Skills<span className="text-red-500">*</span>
                <Selector className={"self-baseline"} items={skills}>
                  Skill select
                </Selector>
                <CommentBox
                  label="Preferences"
                  name="preferences"
                  placeholder="Gardening, cooking..."
                />
              </div>
            </div>
            <div className={"flex-1"}>
              <p>
                Availability <span className="text-red-500">*</span>
              </p>
              <MultiDatePickerField required />
            </div>
          </div>
          <div className={"flex gap-8"}>
            <TertiaryButton className={"flex-1"}>Cancel</TertiaryButton>
            <div className={"flex-1"}></div>
            <PrimaryButton type="submit" className={"flex-1"}>
              Save
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
