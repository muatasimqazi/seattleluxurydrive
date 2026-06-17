import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { setUserRole, removeUser } from "@/app/actions/admin-users";
import { InviteForm } from "./invite-form";

export const metadata: Metadata = { title: "Team" };

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-gold/20 text-gold",
  staff: "bg-offwhite/10 text-offwhite/60",
};

export default async function UsersPage() {
  await requireAdmin();

  const supabase = createServiceClient();
  const authClient = await createClient();
  const { data: { user: currentUser } } = await authClient.auth.getUser();

  const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const { data: profiles } = await supabase.from("profiles").select("id, role, full_name");

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) ?? []);

  const rows = (users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? "",
    confirmed: !!u.email_confirmed_at,
    createdAt: u.created_at,
    lastSignIn: u.last_sign_in_at ?? null,
    profile: profileMap.get(u.id) ?? null,
  }));

  rows.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-heading text-3xl font-light text-offwhite mb-2">Team</h1>
      <p className="font-sans text-xs text-offwhite/40 mb-10">
        {rows.length} member{rows.length !== 1 ? "s" : ""}
      </p>

      {/* Invite */}
      <section className="mb-12">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-6">
          Invite Member
        </p>
        <InviteForm />
      </section>

      {/* User list */}
      <section>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-4">
          Members
        </p>
        <div className="border border-offwhite/8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-offwhite/8">
                {["User", "Role", "Status", "Last Sign In", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/35"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isSelf = row.id === currentUser?.id;
                const role = row.profile?.role ?? "staff";

                return (
                  <tr
                    key={row.id}
                    className="border-b border-offwhite/6 last:border-0 hover:bg-offwhite/2 transition-colors"
                  >
                    {/* Email + name */}
                    <td className="px-4 py-4">
                      <p className="font-sans text-sm text-offwhite">
                        {row.email}
                        {isSelf && (
                          <span className="ml-2 font-sans text-[9px] uppercase tracking-[0.15em] text-offwhite/30">
                            (you)
                          </span>
                        )}
                      </p>
                      {row.profile?.full_name && (
                        <p className="font-sans text-xs text-offwhite/40 mt-0.5">
                          {row.profile.full_name}
                        </p>
                      )}
                    </td>

                    {/* Role toggle */}
                    <td className="px-4 py-4">
                      {isSelf ? (
                        <span
                          className={`inline-block px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest rounded-sm ${
                            ROLE_COLORS[role] ?? "bg-offwhite/10 text-offwhite/50"
                          }`}
                        >
                          {role}
                        </span>
                      ) : (
                        <div className="flex gap-1.5">
                          {(["admin", "staff"] as const).map((r) => {
                            const action = setUserRole.bind(null, row.id, r);
                            return (
                              <form key={r} action={action}>
                                <button
                                  type="submit"
                                  disabled={role === r}
                                  className={`px-2.5 py-1 font-sans text-[9px] uppercase tracking-widest border transition-colors disabled:cursor-default ${
                                    role === r
                                      ? "border-gold bg-gold/10 text-gold"
                                      : "border-offwhite/15 text-offwhite/35 hover:border-offwhite/40 hover:text-offwhite/70"
                                  }`}
                                >
                                  {r}
                                </button>
                              </form>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`font-sans text-[10px] uppercase tracking-widest ${
                          row.confirmed ? "text-emerald-400" : "text-offwhite/30"
                        }`}
                      >
                        {row.confirmed ? "Active" : "Pending"}
                      </span>
                    </td>

                    {/* Last sign in */}
                    <td className="px-4 py-4 font-sans text-xs text-offwhite/35">
                      {row.lastSignIn
                        ? new Date(row.lastSignIn).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Remove */}
                    <td className="px-4 py-4 text-right">
                      {!isSelf && (
                        <form action={removeUser.bind(null, row.id)}>
                          <button
                            type="submit"
                            className="font-sans text-[11px] text-red-400/50 hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
