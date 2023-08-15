import auth from "@/plugins/auth";
import { type StatusCheck } from "@/types/check";

export function getChecks() : Promise<any> {
    return auth.http({
        url: `/checks`
    });
}

export function getCheck(id: string) : Promise<any> {
    return auth.http({
        url: `/checks/${id}`
    });
}

export function approveOrRejectCheck(id: string, status: StatusCheck) : Promise<any> {
    return auth.http({
        url: `/checks/${id}`,
        method: "patch",
        data: {
            status: status
        }
    });
}