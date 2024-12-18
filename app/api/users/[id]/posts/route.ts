import { ConnectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: any, { params }: any) => {
  try {
    await ConnectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
