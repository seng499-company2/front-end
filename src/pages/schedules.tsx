import { ReactElement } from "react";

import AdminLayout from "@components/Layout/AdminLayout";
import { ScheduleProvider } from "@hooks/useSchedule";
import dynamic from "next/dynamic";

const DynamicSchedules = dynamic(() => import("@components/Schedule"), {
    ssr: false,
});

const Schedules = () => {
    return (
        <ScheduleProvider>
            <DynamicSchedules />
        </ScheduleProvider>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
