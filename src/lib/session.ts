import { db } from "@/db";
import { clinicsTable } from "@/db/schema";

import { auth } from "./auth";
import { isLocalAuthBypassEnabled } from "./local-auth-config";

const LOCAL_USER_ID = "my-doctor-local-user";
const LOCAL_CLINIC_ID = "00000000-0000-4000-8000-000000000001";

type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

let localClinicSetup: Promise<void> | undefined;

async function ensureLocalClinic() {
  localClinicSetup ??= db
    .insert(clinicsTable)
    .values({ id: LOCAL_CLINIC_ID, name: "my.doctor Local Clinic" })
    .onConflictDoNothing()
    .then(() => undefined)
    .catch((error: unknown) => {
      localClinicSetup = undefined;
      throw error;
    });

  await localClinicSetup;
}

function createLocalSession(): AuthSession {
  const now = new Date();

  return {
    session: {
      id: "my-doctor-local-session",
      token: "my-doctor-local-session-token",
      userId: LOCAL_USER_ID,
      expiresAt: new Date("2099-01-01T00:00:00.000Z"),
      createdAt: now,
      updatedAt: now,
      ipAddress: null,
      userAgent: "local-auth-bypass",
    },
    user: {
      id: LOCAL_USER_ID,
      name: "Local Developer",
      email: "local@my.doctor",
      emailVerified: true,
      image: null,
      createdAt: now,
      updatedAt: now,
      plan: "essential",
      clinic: {
        id: LOCAL_CLINIC_ID,
        name: "my.doctor Local Clinic",
      },
    },
  } as AuthSession;
}

export async function getSession(headers: Headers) {
  if (!isLocalAuthBypassEnabled()) {
    return auth.api.getSession({ headers });
  }

  await ensureLocalClinic();
  return createLocalSession();
}
