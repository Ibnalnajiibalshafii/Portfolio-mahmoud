import { SiteHeader } from "@/components/site-header";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in | Mahmoud Nagib" }] }),
  component: Login,
});

function Login() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-6 py-16">
        <div className="panel w-full rounded-2xl p-8">
          <h1 className="text-2xl font-bold">Owner sign-in</h1>
          <p className="mt-2 text-sm text-muted">
            Project editing is limited to mahmuodnagib9@gmail.com.
          </p>
          {authEnabled ? (
            <div className="mt-6 flex flex-col gap-3">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/admin" })}
                  className="rounded-full border border-teal px-4 py-3 font-medium text-teal transition hover:bg-teal hover:text-white"
                >
                  Continue with {provider.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is turned off.</p>
          )}
        </div>
      </main>
    </>
  );
}
