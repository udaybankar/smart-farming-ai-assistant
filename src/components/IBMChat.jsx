import { useEffect } from "react";

export default function IBMChat() {
  useEffect(() => {
    // Prevent loading twice
    if (window.wxoLoader) return;

    window.wxOConfiguration = {
      orchestrationID:
        "c1fa9a61a34c42c68b4ca5d7457ee224_285b027b-90e7-41fb-9d32-c6751c470048",
      hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
      rootElementID: "root",
      deploymentPlatform: "ibmcloud",
      crn: "crn:v1:bluemix:public:watsonx-orchestrate:au-syd:a/c1fa9a61a34c42c68b4ca5d7457ee224:285b027b-90e7-41fb-9d32-c6751c470048::",
      chatOptions: {
        agentId: "17de6f84-a1f7-4939-a9de-32097c622f2e",
        agentEnvironmentId: "a7834090-642e-489c-a9ff-58bc87c1a70f",
      },
    };

    const script = document.createElement("script");
    script.src =
      "https://au-syd.watson-orchestrate.cloud.ibm.com/wxochat/wxoLoader.js?embed=true";
    script.async = true;

    script.onload = () => {
      if (window.wxoLoader) {
        window.wxoLoader.init();
      }
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove the script on unmount
    };
  }, []);

  return null;
}