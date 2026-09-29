"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/ActivityCard";
import type { Activity } from "@/types";

const categories = ["All", "Safari & Wildlife", "Victoria Falls", "Water Adventures", "Cultural Experiences", "Dining & Cruises"] as const;

export function ActivityCatalogue({ activities }: { activities: Activity[] }) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const visibleActivities = useMemo(() => selectedCategory === "All" ? activities : activities.filter(activity => activity.category === selectedCategory), [activities, selectedCategory]);

  return <><div className="catalogue-filters" role="group" aria-label="Filter activities by category">{categories.map(category => <button key={category} type="button" className={selectedCategory === category ? "selected" : ""} onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>)}</div><p className="catalogue-count" aria-live="polite">{visibleActivities.length} {visibleActivities.length === 1 ? "experience" : "experiences"} to explore</p><div className="card-grid">{visibleActivities.map(activity => <ActivityCard key={activity.slug} activity={activity} />)}</div></>;
}
