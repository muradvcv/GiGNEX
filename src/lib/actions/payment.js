"use server"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// post payment history
export const postPayment=async(data)=>{

  const res=await fetch(`${baseUrl}/payment`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const resData=await res.json()
  return resData;

}

// get payment by client id
export const getPaymentByClient = async (clientId) => {
  console.log("clientId:", clientId);

  const res = await fetch(
    `${baseUrl}/api/payments/client/${clientId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

