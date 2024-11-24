import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Meow! What did you put in my lunch box today?",
    isSent: false,
  },
  {
    id: 2,
    content: "Mrrr... purrr... it’s a secret recipe only I know!",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle the "Done" button click
  const handleDoneClick = () => {
    toast.success(`${theme} theme applied successfully`);
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="h-screen w-screen fixed top-8 left-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`bg-base-100 rounded-xl pb-8 shadow-lg max-w-5xl w-full mx-4 md:mx-0`}
        data-theme={theme}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-6 mt-6 md:mt-10 mx-4 sm:mx-6 lg:mx-12">
          {/* Theme Selection */}
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Theme</h2>
              <p className="text-sm text-base-content/70">
                Choose a theme for your meow chat interface
              </p>
            </div>

            {/* Scrollable Theme Bar */}
            <div className="grid sm:grid-cols-3 overflow-y-auto max-h-64 border border-base-300 rounded-lg p-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`group flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors ${
                    theme === t ? "bg-base-200" : "hover:bg-base-200/50"
                  }`}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative h-10 w-full rounded-md overflow-hidden"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[12px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>

            {/* Done Button */}
            <div className="flex justify-center p-4">
              <button className="btn btn-success" onClick={handleDoneClick}>
                Done
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="rounded-xl pt-10 border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            {/* Meow Themes Title */}
            <h2 className="text-2xl font-semibold text-primary text-center mb-6">
              Meow Themes
            </h2>
            <div className="p-4 bg-base-200">
              <div className="max-w-md mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">My Hooman</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[150px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar styles when Settings Modal is open */}
      <style>
        {`
          /* Apply opacity and disable interaction on navbar */
          .navbar {
            opacity: 0.5;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default SettingsPage;
