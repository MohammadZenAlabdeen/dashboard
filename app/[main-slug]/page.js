import MainPage from "@/components/Main-dashboard-page/Main-dashboad-page";
import { cookies } from "next/headers";
import ValidateToken from "@/utils/validate_token";


async function MainDashBoardPage() {

  const token = (await cookies()).get("jwtToken");
  const payload = await ValidateToken(token.value);




  if(payload==null){
    console.log("Payload Error");
  }
  else
  {
    console.log(payload)
  }
 
  return (
<>
    <MainPage />
    
</>
  )
  
}

export default MainDashBoardPage
