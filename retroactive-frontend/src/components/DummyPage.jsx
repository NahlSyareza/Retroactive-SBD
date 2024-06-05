import axios from "axios";
import { useNavigate } from "react-router-dom";

function DummyPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-400 flex justify-start w-full max-w-sm mx-auto mt-10 rounded-3xl">
        <div className="p-4">
          <input className="" />
        </div>
        <div className="p-4">
          <input className="" />
        </div>
      </div>
    </>
  );
}

export default DummyPage;
