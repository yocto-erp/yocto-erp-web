import { useCallback, useEffect, useMemo, useState } from "react";

const SCOPE = "https://www.googleapis.com/auth/drive";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const CLIENT_ID =
  "558284614580-iogb9rkjueng65vurluar2pg5sh4bljh.apps.googleusercontent.com";
const API_KEY = "AIzaSyCpDS5nrDf97VbLcPSstQXEcvba4ZaorsE";

export function useGoogleApi() {
  const [googleApi, setGoogleApi] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    const onLoad = () => {
      setGoogleApi(window.gapi);
    };
    if (window.gapi) {
      // if window.google object is already available just use it
      setGoogleApi(window.gapi);
    } else {
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", onLoad);
      document.body.appendChild(script);
    }
    return () => {
      script.removeEventListener("load", onLoad);
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (googleApi) {
      googleApi.load("client:auth2", () => {
        googleApi.client
          .init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPE,
          })
          .then(function success() {
            // Listen for sign-in state changes.
            setIsSignIn(googleApi.auth2.getAuthInstance().isSignedIn.get());
            setIsLoading(false);
          });
      });
    }
  }, [googleApi]);

  const signOut = useCallback(() => {
    if (googleApi) {
      googleApi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => {
          setIsSignIn(false);
        });
    }
  }, [googleApi]);

  const listFiles = useCallback(
    ({ id, pageSize = 100, pageToken, search, mimeType }) => {
      console.log(`PageSize: ${pageSize}`);
      const q = ["trashed=false"];
      if (id) {
        q.push(`'${id}' in parents`);
      }
      if (search && search.length) {
        q.push(`name contains '${search}'`);
      }
      if (mimeType && mimeType.leading) {
        q.push(`mimeType = '${mimeType}`);
      }
      return googleApi.client.drive.files.list({
        pageSize,
        fields: "nextPageToken, files",
        spaces: "drive",
        corpora: "user",
        q: q.join(" and "),
        pageToken,
        orderBy: "folder asc,name desc",
      });
    },
    [googleApi],
  );

  const signIn = useCallback(
    () =>
      googleApi.auth2
        .getAuthInstance()
        .signIn()
        .then(success => {
          console.log(success);
          setIsSignIn(true);
        }),
    [googleApi],
  );

  const currentUser = useMemo(() => {
    let rs = null;
    if (googleApi && isSignIn) {
      const GoogleAuth = googleApi.auth2.getAuthInstance();
      rs = GoogleAuth.currentUser.get();
    }
    return rs;
  }, [googleApi, isSignIn]);

  return {
    googleApi,
    isSignIn,
    isLoading,
    currentUser,
    listFiles,
    signOut,
    signIn,
  };
}
