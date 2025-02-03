// File: src/api.js
export const signupUser = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error during signup:", error);
      throw error; 
    }
  };
  

  export const loginUser = async(formData) => {
    try{
        const response = await fetch("http://127.0.0.1:8000/login", {
            method : "POST",
            headers : {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return await response.json();

    }catch (error) {
        console.error("Error during signup:", error);
        throw error; 
      }
  };

  export const searchApi = async(request) =>{
    try{
      const response = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(request),
      });
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      return await response.json()

    }catch (error) {
        console.error("Error during signup:", error);
        throw error; 
      }
  }

  export const ragApi = async(request) =>{
    try{
      const response = await fetch("http://127.0.0.1:8000/getResponseFromRAG", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(request),
      });
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      return await response.json()

    }catch (error) {
        console.error("Error during signup:", error);
        throw error; 
      }
  }


  
