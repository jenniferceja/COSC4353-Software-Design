import { matchVolunteers } from "../utils/matchVolunteers.js";
import { mockProfiles } from "../mocks/mockProfiles.js";
import { mockEvents } from "../mocks/mockEvents.js";

describe("matchVolunteers - Updated Strict Matching", () => {
  it("matches volunteers for Event 1: Community Cooking", () => {
    const event = mockEvents[1];
    const matches = matchVolunteers(Object.values(mockProfiles), event);

    // Alice is the only match (correct state, available, has all skills)
    expect(matches.length).toBe(2);
    expect(matches[0].fullName).toBe("Alice");
    expect(matches[1].fullName).toBe("Iggy");

    // Diana and Gio are same city but wrong state or skills
    expect(matches.find(v => v.fullName === "Diana")).toBeUndefined();
    expect(matches.find(v => v.fullName === "Gio")).toBeUndefined();
  });

  it("matches volunteers for Event 2: Church Gardening", () => {
    const event = mockEvents[2];
    const matches = matchVolunteers(Object.values(mockProfiles), event);

    // Bob is perfect match (skills, date, city, state)
    expect(matches.length).toBe(1);
    expect(matches[0].fullName).toBe("Bob");

    // Eric has skills but wrong state, Hannah has correct state but wrong date
    expect(matches.find(v => v.fullName === "Eric")).toBeUndefined();
    expect(matches.find(v => v.fullName === "Hannah")).toBeUndefined();
  });

  it("matches volunteers for Event 3: Marathon Setup", () => {
    const event = mockEvents[3];
    const matches = matchVolunteers(Object.values(mockProfiles), event);

    // Charlie has *both* First-Aid and Team Skills in TX
    expect(matches.length).toBe(1);
    expect(matches[0].fullName).toBe("Charlie")
    
  });

  it("excludes volunteers from different states", () => {
    const event = mockEvents[1]; // TX
    const matches = matchVolunteers(Object.values(mockProfiles), event);

    // Diana is from AK, so should be excluded even though city matches
    expect(matches.find(v => v.fullName === "Diana")).toBeUndefined();
  });

  it("excludes volunteers without required skills", () => {
    const event = { ...mockEvents[1], skillsRequired: ["Cooking", "Gardening"] };
    const matches = matchVolunteers(Object.values(mockProfiles), event);

    // Nobody has both Cooking + Gardening in TX
    expect(matches.length).toBe(0);
  });

  it("excludes volunteers not available on event date", () => {
    const event = {...mockEvents[2], date: new Date("2025-08-07)")};
    const matches = matchVolunteers(Object.values(mockProfiles), event);

    // No One is available on that date
    expect(matches.length).toBe(0);
    
  });
});
