import axios from "axios";


export const SendReview=async (reviewcontent:string,productid:string,ratingnumber:number)=>{
    const apiurl="http://localhost:5237/api/Review/SendReview";
    if(reviewcontent==null || productid==null ||ratingnumber==null){
        return 'invalid';
    }
    const username=localStorage.getItem("username");
    if(username!=null){

   
    const data={
      username,
       reviewcontent,
       productid,
       ratingnumber
    }
    try {
        const response=await axios.post(apiurl,data,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },

           
        }

       
      
            
        )
        if(response.status==200){
            console.log(response.data)
           return response.data;
        }else{
            console.log("error in sending review");
            return 'error';
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}
}



export const SendReview2 = async (
  reviewcontent: string,
  productid: string,
  ratingnumber: number
) => {
  const apiurl = "http://localhost:5237/api/Review/SendReview";
  const username = localStorage.getItem("username");

  // Check for invalid input
  if (!username || !reviewcontent || !productid || ratingnumber == null) {
    return { success: false, message: "Invalid input" };
  }
  const stringinpi=ratingnumber.toString();

  const data = {
    username,
    reviewcontent,
    productid,
    ratingnumber:stringinpi
  };
  console.log(data);

  try {
    const response = await axios.post(apiurl, data, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      console.log("✅ API Success:", response.data);
      return response.data ?? { success: true, message: "Review submitted" };
    } else {
      console.warn("⚠️ Unexpected response status:", response.status);
      return { success: false, message: "Unexpected server response" };
    }

  } catch (error: any) {
    console.error("❌ Axios error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Error sending review"
    };
  }
};
