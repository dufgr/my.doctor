import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import WithAuthentication from "@/hocs/with-authentication";
import { getSession } from "@/lib/session";

import AddDoctorButton from "./_components/add-doctor-button";
import DoctorCard from "./_components/doctor-card";

const DoctorsPage = async () => {
  const session = await getSession(await headers());
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session!.user.clinic!.id),
  });
  return (
    <WithAuthentication mustHaveClinic mustHavePlan>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Médicos</PageTitle>
            <PageDescription>
              Gerencie os médicos da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddDoctorButton />
          </PageActions>
        </PageHeader>
        <PageContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default DoctorsPage;
