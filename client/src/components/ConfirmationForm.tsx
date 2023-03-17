import React from "react";

interface Props {
  acceptFunction: any;
  setShowConfirm: any;
  showConfirm?: any;
}

const ConfirmationForm: React.FC<Props> = ({
  showConfirm,
  acceptFunction,
  setShowConfirm,
}) => {
  const handleClick = () => {
    if (showConfirm) {
      acceptFunction(showConfirm);
      return;
    }
    acceptFunction();
  };
  return (
    <>
      <h1 className="text-sm md:text-md font-bold mb-5">Are you sure ?</h1>
      <div className="w-full flex justify-between gap-2 md:gap-5">
        <button
          onClick={handleClick}
          className="w-16 text-sm md:text-md md:w-20 h-8 bg-red-800 font-semibold rounded-md"
        >
          Confirm
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="w-16 text-sm md:text-md md:w-20 h-8 bg-white text-black font-semibold rounded-md"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ConfirmationForm;
