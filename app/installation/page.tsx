import CardWrapper from '@/components/shared/CardWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MonitorSmartphoneIcon } from 'lucide-react';

const InstallationPage = () => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-rows-1 grid-cols-1 grid-flow-col leading-10 h-full">
        <CardWrapper
          label="Installation"
          labelIcon={MonitorSmartphoneIcon}
          contentClasses='h-full'
        >
          <ScrollArea type="always">
            <div className="mx-auto py-4 lg:px-4 lg:py-2">
              <h1 className="text-2xl font-semibold mb-2">
                Why Install CalTrackMate?
              </h1>
              <div className="pl-4">
                <ul className="list-disc list-inside mb-6">
                  <li>
                    <strong>Quick Access</strong>: Launch CalTrackMate directly
                    from your home screen or desktop without opening a browser.
                  </li>
                  <li>
                    <strong>Full-Screen Experience</strong>: When installed,
                    CalTrackMate runs in full-screen mode without the
                    browser&apos;s address bar, giving you an immersive chat
                    experience.
                  </li>
                </ul>
              </div>

              <h1 className="text-2xl font-bold mb-2">
                How to Install CalTrackMate on Your Device
              </h1>
              <div className="pl-4">
                <p className="mb-4">
                  CalTrackMate is a Progressive Web Application (PWA), which
                  means you can install it on your desktop or mobile device for
                  an app-like experience. Below are step-by-step instructions
                  for installing CalTrackMate on various platforms and web
                  browsers.
                </p>

                <h2 className="text-xl font-semibold mb-3">
                  Installing CalTrackMate on Desktop (Windows/Mac/Linux)
                </h2>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>Google Chrome</strong> or{' '}
                  <strong>Microsoft Edge</strong>:
                </h3>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <strong>Look for the install icon</strong> in the address
                    bar (a small &quot;+&quot; or computer icon). If you
                    don&apos;t see it, open the browser menu (three dots in the
                    top-right corner).
                  </li>
                  <li>
                    <strong>Click</strong> on &quot;Install CalTrackMate&quot;
                    from the menu.
                  </li>
                  <li>
                    <strong>Confirm</strong> the installation. CalTrackMate will
                    be added to your desktop as an app.
                  </li>
                  <li>
                    <strong>Launch</strong> it from your desktop, taskbar, or
                    Start menu (Windows) / Applications folder (Mac).
                  </li>
                </ul>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>Mozilla Firefox</strong>:
                </h3>
                <p className="mb-4">
                  Firefox does not currently support automatic PWA installation
                  prompts like Chrome or Edge, but you can still install
                  CalTrackMate as a shortcut:
                </p>
                <ul className="list-disc list-inside mb-3">
                  <li>
                    <strong>Open</strong> CalTrackMate in Firefox and resize the
                    window if necessary to make it a standalone experience.
                  </li>
                  <li>
                    <strong>Bookmark</strong> the page by clicking the star icon
                    or using the shortcut <code>Ctrl+D</code> (Windows) or{' '}
                    <code>Cmd+D</code> (Mac).
                  </li>
                  <li>
                    Create a <strong>desktop shortcut</strong> manually:
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        On Windows: Right-click on the desktop, choose &quot;New
                        &gt; Shortcut,&quot; and paste the URL of CalTrackMate.
                      </li>
                      <li>
                        On Mac: Add the URL as a shortcut via the dock or
                        manually in your bookmarks for quicker access.
                      </li>
                    </ul>
                  </li>
                </ul>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>Safari</strong> on <strong>macOS</strong>:
                </h3>
                <ul className="list-disc list-inside mb-3">
                  <li>
                    <strong>Open</strong> CalTrackMate in Safari.
                  </li>
                  <li>
                    <strong>Go to the top menu bar</strong> and select
                    &quot;File &gt; Add to Dock.&quot;
                  </li>
                  <li>
                    CalTrackMate will now appear in your dock as a shortcut,
                    giving you quick access without the need to open Safari each
                    time.
                  </li>
                </ul>

                <h2 className="text-xl font-semibold mb-3">
                  Installing CalTrackMate on Mobile Devices (Android and iOS)
                </h2>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>Android</strong> Devices (
                  <strong>Google Chrome</strong>):
                </h3>
                <ul className="list-disc list-inside mb-3">
                  <li>
                    <strong>Tap the three dots</strong> in the top-right corner
                    of the browser.
                  </li>
                  <li>
                    Select <strong>&quot;Install app&quot;</strong> or{' '}
                    <strong>&quot;Add to Home Screen&quot;</strong> from the
                    menu.
                  </li>
                  <li>
                    <strong>Confirm</strong> the installation when prompted.
                  </li>
                  <li>
                    CalTrackMate will now appear on your home screen like a
                    regular app.
                  </li>
                </ul>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>Android</strong> Devices (
                  <strong>Mozilla Firefox</strong>):
                </h3>
                <ul className="list-disc list-inside mb-3">
                  <li>
                    <strong>Tap the three dots</strong> in the top-right corner
                    of the browser.
                  </li>
                  <li>
                    Select <strong>&quot;Install&quot;</strong> or{' '}
                    <strong>&quot;Add to Home Screen&quot;</strong>.
                  </li>
                  <li>
                    <strong>Confirm</strong> the installation, and CalTrackMate
                    will appear on your home screen.
                  </li>
                </ul>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>iOS</strong> Devices (<strong>Safari</strong> on
                  iPhone/iPad):
                </h3>
                <ul className="list-disc list-inside mb-3">
                  <li>
                    <strong>Tap the Share button</strong> (the square with an
                    upward arrow) located at the bottom of the screen.
                  </li>
                  <li>
                    Scroll down and tap{' '}
                    <strong>&quot;Add to Home Screen&quot;</strong>.
                  </li>
                  <li>
                    <strong>Confirm</strong> by tapping &quot;Add&quot; in the
                    top-right corner.
                  </li>
                  <li>
                    CalTrackMate will be added to your home screen and can be
                    launched like any other app.
                  </li>
                </ul>

                <h3 className="text-lg font-medium mb-2">
                  For <strong>iOS</strong> Devices (<strong>Chrome</strong> on
                  iPhone/iPad):
                </h3>
                <p className="mb-2">
                  Chrome on iOS does not support direct PWA installation. Please
                  use Safari to install CalTrackMate on your iOS device.
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardWrapper>
      </div>
    </div>
  );
};

export default InstallationPage;
