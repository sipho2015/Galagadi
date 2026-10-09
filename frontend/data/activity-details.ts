import type { Activity } from "@/types";

type ActivityDetails = Required<Pick<Activity, "description" | "itinerary" | "included" | "excluded">>;
const personalExtras = ["Personal purchases and gratuities", "Travel insurance", "Transfers, meals and drinks unless listed in your confirmed booking"];

// Activity-specific outlines, without promising unconfirmed timings or services.
export const activityDetails: Record<string, ActivityDetails> = {
  "morning-game-drive": {
    description: "Explore the bush in the early light with a guide who helps you notice animal movement, tracks and the surrounding habitat. The outing balances wildlife observation with time to appreciate the landscape, stopping for photographs when conditions allow. Your viewing area, departure time and pickup arrangements are confirmed before the outing; wildlife sightings vary from day to day.",
    included: ["The morning game-drive experience in your confirmed booking", "Guided wildlife viewing"],
    excluded: ["Park entry fee, charged separately", ...personalExtras],
    itinerary: [
      { title: "Meet and prepare", description: "Meet at the agreed pickup or departure point and hear your guide's introduction to the outing and viewing guidelines." },
      { title: "Explore in the morning light", description: "Follow the guide through the selected viewing area, looking for wildlife and learning about the habitat." },
      { title: "Pause and observe", description: "Allow time for quiet observation and photographs where sightings and conditions permit." },
      { title: "Complete your outing", description: "Return to the agreed finishing point using the arrangements confirmed for your booking." }
    ]
  },
  "pm-game-drive": {
    description: "Spend the afternoon exploring the bush as the light softens and the landscape takes on a different atmosphere. Your guide shapes the outing around available viewing areas and animal activity, with opportunities to observe, ask questions and take photographs. This is an afternoon safari experience rather than a full-day Hwange package; the location and departure arrangements are agreed when booking.",
    included: ["The afternoon game-drive experience in your confirmed booking", "Guided wildlife viewing"],
    excluded: ["Park entry fee, charged separately", ...personalExtras],
    itinerary: [
      { title: "Afternoon meeting", description: "Join your guide at the confirmed departure point and prepare for time outdoors." },
      { title: "Guided game viewing", description: "Explore the chosen area while your guide explains wildlife behaviour and the surrounding landscape." },
      { title: "Changing light and photography", description: "Pause at suitable sightings and enjoy the afternoon scenery without rushing between stops." },
      { title: "Finish the drive", description: "Complete the planned route and return to the agreed finishing point." }
    ]
  },
  "night-game-drive": {
    description: "Discover the atmosphere of the bush after dark, when sounds and visibility change and a guide's knowledge becomes central to the experience. The outing focuses on observing the nighttime environment rather than guaranteeing particular animals. The current priced option combines the drive with a bush dinner; the order, venue and departure arrangements are confirmed for your date.",
    included: ["The guided night game drive in the selected booking", "Bush dinner with the currently listed dinner-inclusive option"],
    excluded: ["Park entry fee, charged separately", "Drinks unless listed in your confirmed booking", "Transfers unless confirmed", "Personal purchases, gratuities and travel insurance"],
    itinerary: [
      { title: "Meet your guide", description: "Arrive at the agreed meeting point and receive the briefing for the evening outing." },
      { title: "Experience the bush after dark", description: "Travel with your guide through the selected area, listening and looking for wildlife while following viewing instructions." },
      { title: "Bush dinner", description: "Enjoy the dinner arranged with your selected option. Share dietary needs before booking; the sequence of dinner and driving is confirmed in advance." },
      { title: "Evening finish", description: "Conclude at the agreed finishing point with the return arrangements specified in your booking." }
    ]
  },
  "helicopter-flight": {
    description: "See Victoria Falls and the Zambezi landscape from a perspective that complements a walk through the rainforest viewpoints. Choose from the flight options shown in the pricing section, with different durations giving different amounts of time in the air. Your operator confirms the route, departure arrangements and flight suitability; flights depend on weather and availability.",
    included: ["The helicopter flight option selected in your confirmed booking", "Pre-flight briefing"],
    excluded: ["Government fees and fuel surcharges where charged separately", ...personalExtras],
    itinerary: [
      { title: "Check in for your chosen flight", description: "Arrive at the confirmed departure point and complete the operator's check-in process." },
      { title: "Briefing and boarding", description: "Follow the crew's instructions for boarding, seating and handling your belongings." },
      { title: "Aerial sightseeing", description: "Enjoy views of the Falls and surrounding landscape along the route for your selected flight. The crew determines the operating route and conditions." },
      { title: "Landing and onward arrangements", description: "Disembark as directed and continue with the transfer or onward travel agreed for your booking." }
    ]
  },
  "bungee-jumping": {
    description: "Take on a high-energy adventure in the Victoria Falls bridge setting. The experience centres on preparation, an operator briefing and the jump itself, with staff directing each stage. Confirm eligibility and participation requirements before booking, and allow time for check-in and any access formalities rather than treating the jump as an immediate departure.",
    included: ["The bungee-jump experience in your selected booking", "Operator briefing and equipment for the booked jump"],
    excluded: ["Bridge toll or access charges where applicable", "Photos or video unless included in your selected option", ...personalExtras],
    itinerary: [
      { title: "Arrival and check-in", description: "Reach the agreed meeting point and complete the operator's participation checks and any required access arrangements." },
      { title: "Preparation and briefing", description: "Listen to the staff's instructions and let the team prepare the equipment for your jump." },
      { title: "Your jump", description: "Take part when instructed by the operating team, following their directions throughout." },
      { title: "Recovery and finish", description: "Complete the operator's recovery process and return to the designated finishing area." }
    ]
  },
  "jet-boat": {
    description: "Experience a fast-paced river outing combining speed, spray and the scenery around Victoria Falls. The jet-boat experience is suited to travellers looking for an energetic addition to their itinerary. Your operator confirms the route, access arrangements and participation requirements; conditions determine how the outing runs.",
    included: ["The jet-boat outing in your confirmed booking", "Crew briefing and required equipment for the booked outing"],
    excluded: ["National Parks fee, charged separately", ...personalExtras],
    itinerary: [
      { title: "Meet for the outing", description: "Arrive at the confirmed meeting point and follow the arranged route to the boarding area." },
      { title: "Crew briefing", description: "Hear the instructions, prepare your belongings and board as directed." },
      { title: "River adventure", description: "Enjoy the ride and river scenery while the crew operates according to the conditions." },
      { title: "Disembark and return", description: "Leave the vessel as directed and complete the return arrangements for your selected booking." }
    ]
  },
  "white-water-rafting": {
    description: "Explore the Zambezi through an active rafting experience guided by the river team. The available high-water, low-water and overnight options are shown in the pricing section, and the suitable programme depends on operating conditions. Discuss fitness, access and participation requirements before choosing an option; your guide directs the route and each stage of the outing.",
    included: ["The rafting programme selected in your confirmed booking", "Guide briefing and rafting equipment for the selected outing"],
    excluded: ["National Parks fee, charged separately", "Overnight arrangements unless you book the overnight option", ...personalExtras],
    itinerary: [
      { title: "Meet and prepare", description: "Join the river team at the confirmed meeting point and complete the preparation for your selected programme." },
      { title: "Briefing and river access", description: "Learn the team's paddling and safety instructions, then reach the launch point using the arranged access route." },
      { title: "Guided rafting", description: "Work with your raft team along the operating route, following your guide's instructions through the river sections." },
      { title: "Finish your selected programme", description: "Complete the planned exit and return arrangements. An overnight option follows its separately confirmed programme." }
    ]
  },
  "livingstone-island": {
    description: "Visit Livingstone Island for a different perspective on the Victoria Falls setting and the surrounding Zambezi. The visit is shaped by access and river conditions, with the operator determining the suitable programme. Confirm the selected option, transfers and travel documents for your route before booking; an island visit should not be assumed to include any additional swimming experience.",
    included: ["The Livingstone Island visit selected in your confirmed booking", "Guided arrangements for the booked island experience"],
    excluded: ["Transfers, charged separately unless included in your booking", "Visas and border charges where applicable", "Optional experiences not listed in your booking", "Personal purchases, gratuities and travel insurance"],
    itinerary: [
      { title: "Reach the meeting point", description: "Travel to the operator's confirmed departure point using your booked transfer or other agreed arrangements." },
      { title: "Briefing and island access", description: "Meet the team and follow the access arrangements appropriate to the day's conditions." },
      { title: "Guided island visit", description: "Explore the available viewpoints and learn about the island's setting under your guide's direction." },
      { title: "Return from the island", description: "Complete the operator's return journey and continue using your confirmed onward arrangements." }
    ]
  },
  "simunye-theatre-show": {
    description: "Enjoy a cultural evening that brings theatre, music and storytelling together in Victoria Falls. The performance offers a change of pace after daytime sightseeing, with time to settle into the venue and experience the show. Confirm the performance time, seating option and transport arrangements for your date when booking.",
    included: ["Admission to the Simunye performance in your selected booking"],
    excluded: ["Meals and drinks unless included in your selected option", "Transfers unless confirmed", "Personal purchases and gratuities"],
    itinerary: [
      { title: "Arrive at the venue", description: "Reach the theatre in time for your confirmed performance and complete admission." },
      { title: "Take your seat", description: "Settle into the seating arrangements for your booked option before the show begins." },
      { title: "The performance", description: "Enjoy the theatre, music and storytelling programme." },
      { title: "Finish your evening", description: "Leave the venue after the performance and use your agreed return arrangements." }
    ]
  },
  "victoria-falls-town-tour": {
    description: "Get to know Victoria Falls beyond its waterfall viewpoints on a guided introduction to the town. Spend time exploring its character, local crafts and everyday atmosphere, with stops shaped around your interests and the agreed route. The visit can complement a Falls walk without turning your day into a rushed series of activities.",
    included: ["The guided town visit in your confirmed booking"],
    excluded: ["Craft purchases and other shopping", "Admission to optional venues unless included", ...personalExtras],
    itinerary: [
      { title: "Meet your guide", description: "Begin at the agreed meeting point and discuss the interests you would like the visit to focus on." },
      { title: "Explore the town", description: "Follow the agreed route while your guide introduces the town's character and local setting." },
      { title: "Crafts and local stops", description: "Browse the available craft or town stops in your programme, with purchases left to your choice." },
      { title: "Complete the visit", description: "Finish at the agreed point with time to continue your wider Victoria Falls itinerary." }
    ]
  },
  "elephant-interaction": {
    description: "Spend time learning about elephants through a managed experience near Victoria Falls. The focus is on understanding these animals and the setting in which the encounter takes place. Ask about the programme and animal-care approach before booking, and follow the team's guidance throughout; the activity title should not be taken as a promise of unrestricted contact.",
    included: ["The elephant experience specified in your confirmed booking", "Introduction and guidance from the experience team"],
    excluded: ["Optional additions not listed in your selected programme", ...personalExtras],
    itinerary: [
      { title: "Arrival and introduction", description: "Meet the team at the agreed venue and hear an introduction to the experience." },
      { title: "Learn about the elephants", description: "Listen to the team's explanation of the animals, their care and the approach to the encounter." },
      { title: "Guided experience", description: "Take part only in the activities authorised for your selected programme, following the team's instructions." },
      { title: "Questions and departure", description: "Ask any remaining questions and finish using the departure arrangements confirmed for your booking." }
    ]
  },
  "walk-with-the-lions": {
    description: "This listed experience is a guided lion encounter near Victoria Falls. Before choosing it, ask Galagadi to confirm the current programme, participation requirements and animal-care approach. The operator determines whether the experience runs and what participation involves; the title alone does not establish the availability of a particular form of contact or walking activity.",
    included: ["Only the guided encounter programme specified in your confirmed booking"],
    excluded: ["Optional additions not listed in your selected programme", ...personalExtras],
    itinerary: [
      { title: "Confirm the programme", description: "Agree the available experience and participation requirements before making travel arrangements." },
      { title: "Meet the team", description: "Arrive at the confirmed venue and complete the operator's introduction and briefing." },
      { title: "Guided encounter", description: "Follow the programme authorised for the day and the team's instructions throughout." },
      { title: "Finish and depart", description: "Conclude with the team and use the departure arrangements listed in your booking." }
    ]
  }
};
