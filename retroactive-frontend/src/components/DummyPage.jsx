import axios from "axios";
import { useNavigate } from "react-router-dom";

function DummyPage() {
  const navigate = useNavigate();

  const modal = () => {};

  return (
    <>
      <div className="bg-gray-400 w-96 h-96 mx-auto rounded-3xl flex-col">
        <button onClick={modal} />
      </div>
    </>
  );
}

export default DummyPage;
