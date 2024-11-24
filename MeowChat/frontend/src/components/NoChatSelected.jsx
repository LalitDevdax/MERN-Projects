import { PawPrint } from "lucide-react"; // Importing a paw print icon from Lucide

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Cat Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <PawPrint className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-primary">
          Your's Only Meow Chat
        </h2>
        <p className="text-base-content/60">
          Select a meow chat user to start meowing ....
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
