import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Root from "./navigators/Root";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Root/>
      </NavigationContainer>
    </QueryClientProvider>
  );
};


export default App;
