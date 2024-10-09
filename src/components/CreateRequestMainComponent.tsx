import React, { useState } from "react";
import { Button, TextInput, Alert } from "flowbite-react";
import { HiPlus, HiX, HiTrash } from "react-icons/hi";

interface UrlEntry {
  id: number;
  value: string;
  error?: string;
}

export function CreateRequestMainComponent() {
  const [urlEntries, setUrlEntries] = useState<UrlEntry[]>([
    { id: 1, value: "" },
  ]);

  const validateUrl = (url: string): string | undefined => {
    if (!url.trim()) {
      return "URL is required";
    }
    const urlPattern = /^https?:\/\/drive\.google\.com\/.+$/;
    if (!urlPattern.test(url)) {
      return "Invalid Google Drive URL";
    }
    return undefined;
  };

  const addUrlEntry = () => {
    let hasErrors = false;
    const updatedEntries = urlEntries.map((entry) => {
      const error = validateUrl(entry.value);
      if (error) hasErrors = true;
      return { ...entry, error };
    });

    if (hasErrors) {
      setUrlEntries(updatedEntries);
      return;
    }

    if (urlEntries.length < 10) {
      const newId = Math.max(...urlEntries.map((entry) => entry.id)) + 1;
      setUrlEntries([...urlEntries, { id: newId, value: "" }]);
    }
  };

  const removeUrlEntry = (id: number) => {
    if (urlEntries.length > 1) {
      setUrlEntries(urlEntries.filter((entry) => entry.id !== id));
    }
  };

  const handleUrlChange = (id: number, value: string) => {
    setUrlEntries(
      urlEntries.map((entry) =>
        entry.id === id ? { ...entry, value, error: undefined } : entry
      )
    );
  };

  const handleSubmit = () => {
    let isValid = true;
    const validatedEntries = urlEntries.map((entry) => {
      const error = validateUrl(entry.value);
      if (error) isValid = false;
      return { ...entry, error };
    });

    setUrlEntries(validatedEntries);

    if (isValid) {
      const formattedData = urlEntries.map((entry, index) => ({
        url: `entry-${index + 1}`,
        value: entry.value.split("/").pop() || entry.value,
      }));
      alert(JSON.stringify(formattedData, null, 2));
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg ">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-xl font-extrabold text-gray-900">
          Create New Request
        </h3>
        <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5">
          <HiX className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6 h-screen">
        <div>
          <h4 className="text-lg font-bold text-gray-900">
            Add videos or folders
          </h4>
          <p className="text-sm text-gray-600">
            These videos would be cut, labeled and made available in your
            Recharm video library
          </p>
        </div>

        <div className="space-y-4">
          {urlEntries.map((entry, index) => (
            <div key={entry.id} className="flex items-center gap-2">
              <div className="flex-grow">
                <TextInput
                  type="text"
                  placeholder={`URL ${index + 1}`}
                  value={entry.value}
                  onChange={(e) => handleUrlChange(entry.id, e.target.value)}
                  color={entry.error ? "failure" : undefined}
                />
                {entry.error && (
                  <Alert color="failure" className="mt-2">
                    {entry.error}
                  </Alert>
                )}
              </div>
              {urlEntries.length > 1 && (
                <Button color="gray" onClick={() => removeUrlEntry(entry.id)}>
                  <HiTrash className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {urlEntries.length < 10 && (
          <Button
            color="light"
            onClick={addUrlEntry}
            className="text-sm font-medium hover:text-purple-800 bg-white hover:bg-gray-50 border border-gray-300"
          >
            <span className="flex items-center">
              <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                <HiPlus className="h-3 w-3 text-white" />
              </span>
              Add URL
            </span>
          </Button>
        )}
      </div>

      <div className="flex items-center justify-end p-4 border-t">
        <Button
          color="purple"
          onClick={handleSubmit}
          className="text-sm font-medium bg-purple-700 hover:bg-purple-800"
        >
          Create Request
        </Button>
      </div>
    </div>
  );
}

export default CreateRequestMainComponent;
