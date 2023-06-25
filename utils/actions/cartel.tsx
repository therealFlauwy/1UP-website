import { supabase } from '../../lib/supabaseClient';

export const fetchMaincards = async () => {
  try {
    const { data } = await supabase
      .from("maincards")
      .select("*");

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};

export const fetchRecommendedPosts = async () => {
  try {
    const { data } = await supabase
      .from("userschoice")
      .select("*");

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};



