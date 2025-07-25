import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
//import { fetchUserProfile, updateUserProfile } from "../api/user"; // your API helper
import { fetchUserProfile, updateUserProfile } from "../api/profile";
import Field from "./Field";
import MultiDatePickerField from "./MultiDatePickerField";
import DropdownMenu from "./DropdownMenu";
import Selector from "./Selector";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton from "./Buttons";
import CommentBox from "./CommentBox";
import states from "../data/states";
import skills from "../data/skills";
import { sanitizeInput, useSanitize } from "../hooks/useSanitize";


export default function ProfileEditingCard({ defaultValues = {} }) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      address1: "",
      address2: "",
      zipcode: "",
      city: "",
      state: "",
      skills: [],
      preferences: "",
      availableDates: [],
      ...defaultValues,
    },
  });

  // Load profile data once on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile("123"); // use real user ID later

        // Convert dates to JS Date objects
        const dates = profile.availableDates?.map(d => new Date(d)) || [];

        // Set values
        setValue("fullName", profile.fullName);
        setValue("address1", profile.address1);
        setValue("address2", profile.address2);
        setValue("zipcode", profile.zipcode);
        setValue("city", profile.city);
        setValue("state", profile.state);
        setValue("skills", profile.skills);
        setValue("preferences", profile.preferences);
        setValue("availableDates", dates);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    loadProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    const cleaned = {
      ...data,
      availableDates: data.availableDates.map((d) => {
        try {
          // react-multi-date-picker DateObject has `.toDate()` method
          const jsDate = typeof d.toDate === "function" ? d.toDate() : d;
          return jsDate instanceof Date && !isNaN(jsDate)
            ? jsDate.toISOString().split("T")[0]
            : "";
        } catch {
          return "";
        }
    }),

    fullName: sanitizeInput(data.fullName, { allowCharacters: "'-" }),
    address1: sanitizeInput(data.address1),
    address2: sanitizeInput(data.address2),
    zipcode: sanitizeInput(data.zipcode),
    city: sanitizeInput(data.city),
    state: sanitizeInput(data.state),
    preferences: sanitizeInput(data.preferences, { allowCharacters: "/.,-" }),
    }
    console.log("Sanitized data:", cleaned);
  // Send `cleaned` to backend instead of raw `data`
    
    try {
      const result = await updateUserProfile("1", cleaned); // mock ID for now
      console.log("Profile updated:", result);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  


  return (
    <div className="bg-white text-secondary px-4 py-2 rounded border-2 border-solid w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <div className="flex flex-col size-full gap-2">
          <div className="flex flex-3 flex-col gap-2">
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "Name is required.",
                maxLength: { value: 50, message: "Name cannot exceed 50 characters."},
               }}
              render={({ field }) => (
                <Field 
                required
                maxLength={50} 
                label="Name" 
                placeholder="John Doe" 
                errorMessage={errors.name?.message} 
                {...field} 
                />
              )}
            />

            <Controller
              name="address1"
              control={control}
              rules={{ required: "Address is required." ,
                maxLength: { value: 100, message: "Address 1 cannot exceed 100 characters."},
              }}
              render={({ field }) => (
                <Field 
                required
                maxLength={100}
                label="Address 1" 
                placeholder="Penny Lane" 
                errorMessage={errors.address1?.message} 
                {...field} 
                />
              )}
            />

            <div className="flex gap-4">
              <Controller
                name="address2"
                control={control}
                rules={{ maxLength: { value: 100, message: "Address 2 cannot exceed 100 characters."},
              }}
                render={({ field }) => (
                  <Field 
                  maxLength={100}
                  className="flex-3" 
                  label="Address 2" 
                  placeholder="Mailbox 1" 
                  {...field} 
                  />
                )}
              />
              <Controller
                name="zipcode"
                control={control}
                rules={{ required: "Zipcode is required.",
                  minLength: { value: 5, message: "Your zipcode must be at least 5 digits." },
                  maxLength: { value: 9, message: "Your zipcode cannot exceed 9 digits." },
                 }}
                render={({ field }) => (
                  <Field
                    required
                    minLength={5}
                    maxLength={9}
                    className="flex-1"
                    label="Zipcode"
                    type="number"
                    placeholder="12345"
                    errorMessage={errors.zipcode?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex gap-4">
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required." }}
                render={({ field }) => (
                  <Field
                    required
                    className="flex-3"
                    label="City"
                    placeholder="Albuquerque"
                    errorMessage={errors.city?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required." }}
                render={({ field }) => (
                  <div className="flex-1 self-baseline-last flex-col flex">
                    <label className="block text-md font-medium mb-1">
                      State<span className="text-red-500"> *</span>
                    </label>
                    <DropdownMenu
                      required
                      items={states}
                      selected={field.value}
                      onSelect={field.onChange}
                      errorMessage={errors.state?.message}
                    >
                      {field.value || "State select"}
                    </DropdownMenu>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex flex-2 row-span-full gap-4">
            <div className="flex-1 flex flex-col">
              <label className="block text-md font-medium">
                Skills<span className="text-red-500"> *</span>
              </label>
              <Controller
                name="skills"
                control={control}
                rules={{ required: "Select at least one skill." }}
                render={({ field }) => (
                  <Selector
                    items={skills}
                    value={field.value}
                    onChange={field.onChange}
                    name="skills"
                    errorMessage={errors.skills?.message}
                    className="self-baseline"
                  >
                    {field.value?.length ? "Edit Skills" : "Skill select"}
                  </Selector>
                )}
              />
              <Controller
                name="preferences"
                control={control}
                render={({ field }) => (
                  <CommentBox label="Preferences" placeholder="Gardening, cooking..." {...field} />
                )}
              />
            </div>

            <div className="flex-1">
              <label className="block text-md font-medium mb-1">
                Availability<span className="text-red-500"> *</span>
              </label>
              <Controller
                name="availableDates"
                control={control}
                rules={{ required: "Please select at least one date." }}
                render={({ field }) => (
                  <MultiDatePickerField
                    label="Availability"
                    name="availableDates"
                    value={field.value}
                    onChange={field.onChange}
                    errorMessage={errors.availableDates?.message}
                  />
                )}
              />

            </div>
          </div>

          <div className="flex gap-8 mt-4">
            <TertiaryButton type="button" className="flex-1">
              Cancel
            </TertiaryButton>
            <div className="flex-1" />
            <PrimaryButton type="submit" className="flex-1">
              Save
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}

/*import { useState } from "react";
import Field from "./Field";
import MultiDatePickerField from "./MultiDatePickerField";
import DropdownMenu from "./DropdownMenu";
import Selector from "./Selector";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton from "./Buttons";
import CommentBox from "./CommentBox";
import states from "../data/states"
import skills from "../data/skills"


const handleStateSelect = (state) => {
  console.log("Selected state:", state);
  // update form input or context state
};

export default function ProfileEditingCard() {
  return (
    <div
      className={`bg-white text-secondary px-4 py-2 rounded border-2 border-solid  w-lg`}
    >
      <form action="" className={`flex`}>
        <div className={"flex flex-col size-full gap-2"}>
          <div className={"flex flex-3 flex-col gap-2"}>
            {/* <div className="">
            <img src={examplepic} width={200} height={200}></img>
          </div> //}
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
}*/
