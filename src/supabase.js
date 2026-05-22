import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nsxpxgrhuynvehdlzpvx.supabase.co'
const SUPABASE_KEY = 'sb_publishable_-drbc1V_Jpr30ZtZl4_N4Q_jahBA6hI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
