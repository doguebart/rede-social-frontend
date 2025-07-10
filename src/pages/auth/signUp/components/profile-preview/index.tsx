interface ProfilePreviewProps {
  fullName: string;
  email: string;
  profilePicture?: string;
}

export const ProfilePreview = ({
  fullName,
  email,
  profilePicture,
}: ProfilePreviewProps) => {

  const nameInitials = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  const nameAndLastname = fullName.split(" ").slice(0, 2).join(" ");

  return (
    <div className="w-full flex gap-4">
      <div className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full p-0.5 border border-dark-blue/50">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile picture"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="rounded-full w-full h-full flex items-center justify-center bg-dark-blue">
            <span className="text-base font-medium text-white">
              {nameInitials}
            </span>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col">
        <p className="text-lg font-medium text-dark-blue">{nameAndLastname}</p>
        <p className="max-w-[90%] text-sm text-dark-blue/70 truncate">
          {email}
        </p>
      </div>
    </div>
  );
};
