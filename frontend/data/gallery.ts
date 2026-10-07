export const galleryCategories = ["Wildlife","Falls","Safari","River","Activities","Accommodation","Transfers"] as const;

export type GalleryImage = {
  category: (typeof galleryCategories)[number];
  title: string;
  detail: string;
  image: string;
  credit?: { name: string; url: string };
};

// Keep one entry per photo, even when the same file appears in multiple folders.
export const galleryImages: GalleryImage[] = [
  // Replace this stock photo with an approved Galagadi fleet image when available.
  { category: "Transfers", title: "Transfer vehicle inspiration", detail: "Illustrative vehicle photo. Actual transfer vehicles are confirmed when booking.", image: "https://images.unsplash.com/photo-1535655685871-dc8158ff167e?auto=format&fit=crop&w=1400&q=82", credit: { name: "Fachy Marin / Unsplash", url: "https://unsplash.com/photos/p_ILi6tlMwM" } },
  {"category":"Wildlife","title":"Elephant country","detail":"Wildlife and birdlife from our safari photo collection.","image":"/images/gallery/Elephant_along_zambezi.jpg"},
  {"category":"Falls","title":"Victoria Falls","detail":"Explore the views around Victoria Falls.","image":"/images/gallery/Zambezi_Curtain.jpg"},
  {"category":"Safari","title":"Into the wild","detail":"A glimpse of the safari experiences featured on our site.","image":"/images/gallery/Inside_the_safari.jpg"},
  {"category":"Activities","title":"Simunye Theatre Show","detail":"Discover the activities you can include in your trip.","image":"/images/activities/SimunyeShow.jpeg"},
  {"category":"Accommodation","title":"Lodge stay","detail":"A look at the accommodation in our photo collection.","image":"/images/accommodation/Lodge1.jpg"},
  {"category":"River","title":"Along the Zambezi","detail":"River scenery and quieter moments along the journey.","image":"/images/gallery/Zambezi_River.jpg"},
  {"category":"Activities","title":"Jet boat adventure","detail":"Discover the activities you can include in your trip.","image":"/images/activities/JetBoat2.jpeg"},
  {"category":"Wildlife","title":"Rhino encounter","detail":"Wildlife and birdlife from our safari photo collection.","image":"/images/gallery/Rhino_Hwange.jpeg"},
  {"category":"Activities","title":"Sunset cruise","detail":"Discover the activities you can include in your trip.","image":"/images/activities/SunsetCruise.jpg"},
  {"category":"Accommodation","title":"Pusnak Lodge","detail":"A look at the accommodation in our photo collection.","image":"/images/accommodation/pusnak-lodge-.jpg"},
  {"category":"Safari","title":"Night game drive","detail":"A glimpse of the safari experiences featured on our site.","image":"/images/gallery/Night_Game.jpg"},
  {"category":"Falls","title":"Mist and rainforest","detail":"Explore the views around Victoria Falls.","image":"/images/gallery/Rain_forest.jpg"},
  {"category":"Activities","title":"Simunye theatre","detail":"Discover the activities you can include in your trip.","image":"/images/activities/SimunyeTheatre.jpeg"},
  {"category":"Activities","title":"Boma dinner","detail":"Discover the activities you can include in your trip.","image":"/images/activities/Boma Dinner.jpg"},
  {"category":"Activities","title":"Elephant interaction","detail":"Discover the activities you can include in your trip.","image":"/images/activities/Elephant_Interaction.jpg"},
  {"category":"Activities","title":"Walk with the lions","detail":"Discover the activities you can include in your trip.","image":"/images/activities/Walk_with lions.jpg"},
  {"category":"Activities","title":"Helicopter flight","detail":"Discover the activities you can include in your trip.","image":"/images/activities/helicopter ride.jpg"},
  {"category":"Activities","title":"Helicopter experience","detail":"Discover the activities you can include in your trip.","image":"/images/activities/Heli_Ride.jpg"},
  {"category":"Activities","title":"Ready for take-off","detail":"Discover the activities you can include in your trip.","image":"/images/activities/helicopter.jpg"},
  {"category":"Activities","title":"Jet boat on the river","detail":"Discover the activities you can include in your trip.","image":"/images/activities/Jetboat.jpg"},
  {"category":"Safari","title":"Afternoon game drive","detail":"A glimpse of the safari experiences featured on our site.","image":"/images/activities/pm_drive.jpg"},
  {"category":"Falls","title":"Aerial views","detail":"Explore the views around Victoria Falls.","image":"/images/activities/Aerial View.jpg"},
  {"category":"Falls","title":"Victoria Falls Bridge","detail":"Explore the views around Victoria Falls.","image":"/images/activities/vic falls bridge.jpg"},
  {"category":"Falls","title":"Under the bridge","detail":"Explore the views around Victoria Falls.","image":"/images/activities/under the bridge.jpg"},
  {"category":"Falls","title":"The Victoria Falls","detail":"Explore the views around Victoria Falls.","image":"/images/destinations/Victoria_Falls.jpg"},
  {"category":"Wildlife","title":"Lions in Chobe","detail":"A group of lions resting together in Chobe wildlife country.","image":"/images/destinations/Chobe.jpg"},
  {"category":"Wildlife","title":"Elephants in Hwange","detail":"An adult elephant and a young elephant in warm evening light.","image":"/images/destinations/Hwange.jpg"},
  {"category":"Wildlife","title":"Birdlife in colour","detail":"Wildlife and birdlife from our safari photo collection.","image":"/images/hero/About_Us.jpeg"},
  {"category":"Wildlife","title":"Monkey encounter","detail":"Wildlife and birdlife from our safari photo collection.","image":"/images/gallery/Monkey.jpeg"},
  {"category":"Wildlife","title":"Wildebeest on safari","detail":"Wildlife and birdlife from our safari photo collection.","image":"/images/safaris/Pm_Gme-Drive.jpeg"},
  {"category":"Wildlife","title":"Buffalo on safari","detail":"Wildlife and birdlife from our safari photo collection.","image":"/images/safaris/Pm_Game-Drive.jpeg"},
  {"category":"River","title":"Sunset views","detail":"River scenery and quieter moments along the journey.","image":"/images/accommodation/SunsetView.jpg"},
];
