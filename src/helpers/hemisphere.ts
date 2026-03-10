enum Hemisphere {
  NORTHERN = "Northern",
  SOUTHERN = "Southern",
}

export class HemisphereHelper {
  get(): Hemisphere {
    const lat = (window as any).latitude;
    if (lat === undefined) return Hemisphere.SOUTHERN;
    return lat >= 0 ? Hemisphere.NORTHERN : Hemisphere.SOUTHERN;
  }
}
