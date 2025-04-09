export async function GET(req) {
    await connectMongoDB();
    try {
               const payload=await VerifyToken(req);
        
    } catch (error) {

    }
}
export async function PUT(req) {
    await connectMongoDB();
    try {
              const payload=await VerifyToken(req);
       
    } catch (error) {

    }
}