import { Music, MicVocal } from "lucide-react";

const Menu = ({
  setSelected,
}: {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="mb-20 text-4xl"> Select the type of project:</h1>
      <div className="flex items-center justify-center">
        <div
          className="mr-20 flex cursor-pointer flex-col items-center gap-y-2 rounded-lg border-2 border-white p-24 hover:bg-white hover:bg-white/10"
          onClick={() => setSelected("voice")}
        >
          <Music color="#fff" />
          Create Voice Project
        </div>
        <div
          className="flex cursor-pointer flex-col items-center gap-y-2 rounded-lg border-2 border-white p-24 hover:bg-white/10"
          onClick={() => setSelected("music")}
        >
          <MicVocal color="#fff" />
          Create Music Project
        </div>
      </div>
    </div>
  );
};

export default Menu;
