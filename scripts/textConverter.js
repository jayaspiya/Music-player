export default function ConvertToReadable(txt, convertToReadableString = true) {
    if (convertToReadableString) {
        txt = txt.replaceAll("_", " ");
    } else {
        txt = txt.replaceAll(" ", "_");
    }

    return txt;
}