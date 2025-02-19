import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { ChangeEvent, useState } from "react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;

      if (typeof base64Image === "string") {
        setSelectedImage(base64Image);
        updateProfile(base64Image);
      } else {
        console.error("Invalid image format");
      }
    };
  };
  return (
    <>
      <div className="h-[90vh] w-full flex flex-col justify-center items-center ">
        <div className="card bg-base-300 w-130 h-[340px] shadow-xl ">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-2xl mt-2">Profile</h1>
            <h2 className="text-[13px]">Your profile information</h2>
            <div className="avatar online">
              <div className="w-24 rounded-full">
                <img
                  src={selectedImage || authUser.profilePic || "/default.png"}
                />
              </div>
            </div>
            <p className="text-[12px] mb-3">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click on the camera icon to update your Photo"}
            </p>
            <div className="w-full flex flex-col ">
              <label className="form-control w-full flex flex-col grow justify-center items-center gap-3">
                <label className="input input-bordered flex items-center gap-2 w-[480px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 relative"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <label htmlFor="ProfilePic-Upload">
                    <Camera className="size-5 bg-base-300 rounded-full absolute top-40 right-54 cursor-pointer" />{" "}
                    <input
                      type="file"
                      accept="image/*"
                      id="ProfilePic-Upload"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                  <input
                    type="text"
                    className="grow max-w-[950px]"
                    defaultValue={authUser?.fullName}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-[480px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow max-w[950px]"
                    defaultValue={authUser?.email}
                  />
                </label>
              </label>
            </div>
          </div>
        </div>
        <div className="card bg-base-300 w-130 h-[130px] shadow-xl mt-3 p-3">
          <h1 className="text-md pl-2 mb-2">Account Information</h1>
          <p className="flex justify-between p-2 border-b-[1px]">
            Member since{" "}
            <span className="text-right text-[13px]">
              {authUser.createdAt.split("T")[0]}
            </span>
          </p>
          <p className="flex justify-between p-2">
            Account status{" "}
            <span className="text-right content-center text-green-500 text-[13px] pr-2">
              Active
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
