import { cookies } from "next/headers";
import ValidateToken from "@/utils/validate_token";
import MainPage from "@/components/Main-dashboard-page/Main-dashboad-page";


async function MainDashBoardPage() {


  const token = await cookies().get("jwtToken");
  const payload = await ValidateToken(token.value);
  
  //console.log(token);

  if(payload==null){
    console.log("Payload Error");
  }
  else
  {
    console.log(payload)
  }

  


  return (
    <MainPage />

  )
}

export default MainDashBoardPage