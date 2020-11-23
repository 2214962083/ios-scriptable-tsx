export {}
declare global {
  /** ---------Alert --------
  Presents an alert.
Use this to configure an alert presented modally or as a sheet. After configuring the alert, call presentAlert() or presentSheet() to present the alert. The two presentations methods will return a value which carries the index of the action that was selected when fulfilled.

---------Alert --------
*/
  class Alert {
    /**
     * Title displayed in the alert. Usually a short string.
     */
    title: string

    /**
     * Detailed message displayed in the alert.
     */
    message: string

    /**
     * Constructs a new alert.
     */
    constructor()

    /**
     * Adds an action to the alert.AddsS an action button to the alert. To check if an action was selected, you should use the first parameter provided when the promise returned by presentAlert() and presentSheet() is resolved.
     * Parameters¶
     * title
     * string
     * Title of the action.
     */
    addAction(title: string)

    /**
     * Adds a destructive action to the alert.Destructive action titles have a red text color, signaling that the action may modify or delete data.
     * Parameters¶
     * title
     * string
     * Title of the action.
     */
    addDestructiveAction(title: string)

    /**
     * Adds a cancel action to the alert.Adds a cancel action to the alert. When a cancel action is selected, the index provided by presentAlert() or presentSheet() will always be -1. Please note that when running on the iPad and presenting using presentSheet(), the action will not be shown in the list of actions. The operation is cancelled by tapping outside the sheet.
     * Parameters¶
     * title
     * string
     * Title of the action.
     */
    addCancelAction(title: string)

    /**
     * Adds a text field prompting for user input.Adds a text field to the alert controller prompting for user input. Retrieve the value for the text field using textFieldValue() and supply\e the index of the text field. Indices for text fields are assigned in the same order as they are added to the alert starting at 0.
     * Text fields are not supported when using the sheet presentation.
     * Parameters¶
     * placeholder
     * string
     * Optional placeholder that will be displayed when the text field is empty.
     * text
     * string
     * Optional default value for the text field.
     */
    addTextField(placeholder: string, text: string)

    /**
     * Adds a secure text field prompting for user input.Adds a secure text field to the alert controller prompting for user input. Values entered into a secure text field will be hidden behind dots. Retrieve the value for the text field using textFieldValue() and supply the index of the text field. Indices for text fields are assigned in the same order as they are added to the alert starting at 0.
     * Parameters¶
     * placeholder
     * string
     * Optional placeholder that will be displayed when the text field is empty.
     * text
     * string
     * Optional default value for the text field.
     */
    addSecureTextField(placeholder: string, text: string)

    /**
     * Retrieves value of a text field.Retrieves the value of a text field added using addTextField() or addSecureTextField(). Indices for text fields are assigned in the same order as they are added to the alert starting at 0.
     * Parameters¶
     * index
     * number
     * Index of text field to retrieve for value.
     * Return value¶
     * string
     * Value of the text field at the specified index.
     */
    textFieldValue(index: number): string

    /**
     * Presents the alert modally.This is a shorthand for presentAlert().
     * Return value¶
     * Promise
     * A promise carrying the selected action index when fulfilled.
     */
    present(): Promise<number>

    /**
     * Presents the alert modally.Return value¶
     * Promise
     * A promise carrying the selected action index when fulfilled.
     */
    presentAlert(): Promise<number>

    /**
     * Presents the alert as a sheet.Return value¶
     * Promise
     * A promise carrying the selected action index when fulfilled.
     */
    presentSheet(): Promise<number>
  } /** ---------args --------
  Arguments passed to the script.
Arguments are passed to the script when the script is executed from a share sheet. You can specify the types of arguments a script supports from the script settings.

---------args --------
*/
  const args: {
    /**
     * Number of arguments supplied by a share sheet.
     * Read-only.
     * Deprecated in version 1.3. Instead of relying on this property, take the length of the array containing the data type you are interested in.
     * The number of arguments passed to the script from the share seeht.
     */
    length: number

    /**
     * All arguments supplied by a share sheet.
     * Read-only.
     * Deprecated in version 1.3. Instead of relying on this property, access the array containing the data type you are interested in.
     * All arguments supplied by the share sheet.
     */
    all: any[]

    /**
     * Plain texts supplied by a share sheet or a shortcut action.
     * Read-only.
     * All plain texts passed to the script from a share sheet or a shortcut action.
     * If you have enabled "Text" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares plain text.
     */
    plainTexts: string[]

    /**
     * URLs supplied by a share sheet or a shortcut action.
     * Read-only.
     * All URLs passed to the script from a share sheet or a shortcut action.
     * If you have enabled "URLs" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares URLs.
     */
    urls: string[]

    /**
     * File URLs supplied by a share sheet or a shortcut action.
     * Read-only.
     * All file URLs passed to the script from a share sheet or a shortcut action.
     * If you have enabled "File URLs" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares URLs pointing to a file.
     * When large files are passed from a share sheet or a shortcut action, the system may terminate the process due to memory constraints. In that case, you should enable "Run in App" in the script settings or in the shortcut.
     */
    fileURLs: string[]

    /**
     * Images supplied by a share sheet or a shortcut action.
     * Read-only.
     * All images passed to the script from a share sheet or a shortcut action.
     * If you have enabled "Images" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares images.
     * When large images are passed from a share sheet or a shortcut action, the system may terminate the process due to memory constraints. In that case, you should enable "Run in App" in the script settings or in the shortcut.
     */
    images: Image[]

    /**
     * Query parameters from a URL scheme.
     * Read-only.
     * Query parameters are supplied to a script when running it from a URL scheme. See the documentation on Scriptables URL schems for more information.
     */
    queryParameters: Record<string, string>

    /**
     * Arguments passed from a Siri Shortcut.
     * Read-only.
     * Deprecated in version 1.4. Instead of using args.shortcutArguments, pass an input parameter to the shortcut action using the Shortcuts app and read the parameter using args.shortcutParameter.
     * When creating a Siri Shortcut in Scriptable, you can define arguments that are passed to the script when the shortcut is run. This lets you differentiate the behavior of a script based on some predefiend arguments.
     * For example, a script that checks the wather may expect an argument with the key "city". When creating a Siri Shortcut for the script, the argument should be passed with the value containing the name of the city to check the weather for.
     */
    siriShortcutArguments: Record<string, string>

    /**
     * Parameter passed to a Shortcut.
     * Read-only.
     * When creating a shortcut using the Shortcuts app, you can pass an input parameter that can be read in your script using args.shortcutParameter.
     * This parameter can be any text, list, dictionary or file and will be exposed in your script using the appropriate type. When passing a file, the "Run Script" action will attempt to read the file as JSON or a plain text. If the file cannot be read as JSON or a plain text, a path to the file will be passed as the input parameter.
     */
    shortcutParameter: any

    /**
     * Parameter passed to a widget.
     * Read-only.
     * When creating a widget on the Home screen, you can define a parameter that can be read in your script using args.widgetParameter.
     * The parameter can be used to differentiate the behavior of multiple widgets.
     */
    widgetParameter: any

    /**
     * Notification being handled by the script.
     * Read-only.
     * The notification that a script is being run in or the application was opened from.
     * The notification contains all information that was set when the notification was originally scheduled, including the userInfo property which can be used to contain custom data that might be relevant when running the script.
     */
    notification: Notification
  } /** ---------Calendar --------
  Holds reminders and events.
Use the Calendar type to get a specific calendar. The calendar is used with the Reminder and CalendarEvent types when fetching reminders or events from a specific calendar or when inserting into a calendar. If you are fetching reminders or events from all calendars, you do not need to pass the calendars when performing the fetch with the Reminder or CalendarEvent types.

---------Calendar --------
*/
  class Calendar {
    /**
     * Calendar identifier.
     * Read-only.
     */
    identifier: string

    /**
     * Title of calendar.
     */
    title: string

    /**
     * Whether the calendar is a subscribed calendar.
     * Read-only.
     */
    isSubscribed: boolean

    /**
     * Indicates whether items can be added, edited, and deleted in the calendar.
     * Read-only.
     */
    allowsContentModifications: boolean

    /**
     * Color of calendar.
     */
    color: Color

    /**
     * Checks if the calendar supports availability.The following values are supported:
     * busy
     * free
     * tentative
     * unavailable
     * Not all calendars support all of these availabilities and some calendars may not support availability at all. Use this function to check if the calendar supports a specific availability.
     * Parameters¶
     * availability
     * string
     * Availability to check against.
     * Return value¶
     * bool
     * True if the calendar supports the availability, otherwise false.
     */
    supportsAvailability(availability: string): boolean

    /**
     * Saves calendar.
     * Saves changes to the calendar.
     */
    save()

    /**
     * Removes calendar.
     * The calendar is removed immediately. This cannot be undone.
     */
    remove()

    /**
     * Fetches calendars for reminders.A calendar can only hold either reminders or events. Call this function to fetch all calendars that can hold reminders.
     * Return value¶
     * Promise<[Calendar]>
     * Promise that provides the calendars when fulfilled.
     */
    static forReminders(): Promise<Calendar[]>

    /**
     * Fetches calendars for events.A calendar can only hold either reminders or events. Call this function to fetch all calendars that can hold events.
     * Return value¶
     * Promise<[Calendar]>
     * Promise that provides the calendars when fulfilled.
     */
    static forEvents(): Promise<Calendar[]>

    /**
     * Fetches a calendar that holds reminders.Parameters¶
     * title
     * string
     * Title of calendar.
     * Return value¶
     * Promise
     * Promise that provides the calendar when fulfilled.
     */
    static forRemindersByTitle(title: string): Promise<Calendar>

    /**
     * Fetches a calendar that holds events.Parameters¶
     * title
     * string
     * Title of calendar.
     * Return value¶
     * Promise
     * Promise that provides the calendar when fulfilled.
     */
    static forEventsByTitle(title: string): Promise<Calendar>

    /**
     * Create a new calendar that holds reminders.This will create a new list for reminders in the Reminders app. The list is automatically saved so there is no need to call save() after creating the list.
     * Return value¶
     * Promise
     * Promise that provides the created calendar when fulfilled.
     */
    static createForReminders(title: string): Promise<Calendar>

    /**
     * Find or create a new calendar that holds reminders.This will attempt to find a calendar for reminders with the specified name. If no calendar is found, a new calendar is created and the calendar will appear as a reminder list in the Reminders app. If multiple calendars are found for the specified name, the first one will be returned. The list is automatically saved so there is no need to call save() in the case the list was created.
     * Return value¶
     * Promise
     * Promise that provides the calendar when fulfilled.
     */
    static findOrCreateForReminders(title: string): Promise<Calendar>

    /**
     * Default calendar for reminders.A calendar can only hold either reminders or events. Call this function to get the default calendar that can hold reminders.
     * Return value¶
     * Promise
     * Promise that provides the calendar when fulfilled.
     */
    static defaultForReminders(): Promise<Calendar>

    /**
     * Default calendar for events.A calendar can only hold either reminders or events. Call this function to get the default calendar that can hold events.
     * Return value¶
     * Promise
     * Promise that provides the calendar when fulfilled.
     */
    static defaultForEvents(): Promise<Calendar>

    /**
     * Presents a view for picking calendars.Parameters¶
     * allowMultiple
     * bool
     * Whether to allow picking multiple calenders. Defaults to false.
     * Return value¶
     * Promise<[Calendar]>
     * Promise that provides the calendars when fulfilled.
     */
    static presentPicker(allowMultiple: boolean): Promise<Calendar[]>
  } /** ---------CalendarEvent --------
  Manages events in calendars.
Used for creating, fetching and removing events from your calendars.

---------CalendarEvent --------
*/
  class CalendarEvent {
    /**
     * Identifier of event.
     * Read-only.
     */
    identifier: string

    /**
     * Title of event.
     */
    title: string

    /**
     * Location of event.
     */
    location: string

    /**
     * Notes associated with event.
     */
    notes: string

    /**
     * Start date of event.
     */
    startDate: Date

    /**
     * End date of event.
     */
    endDate: Date

    /**
     * Whether the event is an all-day event.
     */
    isAllDay: boolean

    /**
     * Attendees associated with the event.
     * Read-only.
     * An array of objects on the following form:
     * {
     *   "isCurrentUser": false,
     *   "name": "John Appleseed",
     *   "status": "accepted",
     *   "type": "person",
     *   "role": "required"
     * }
     *
     * Note that the property is read-only since iOS does not expose API to modify the attendees of an event.
     */
    attendees: any[]

    /**
     * Availability during the event.
     * Indicates how the event should be treated for scheduling purposes. The following values are supported:
     * busy
     * free
     * tentative
     * unavailable
     * Be aware that not all calendars support all of these availabilities and some calendars may not support availability at all. Use Calendar.supportsAvailability() to check if a calendar supports a specific availability.
     */
    availability: string

    /**
     * Time zone of event.
     * Geopolitical region identifier that identifies the time zone, e.g. "Europe/Copenhagen", "America/New_York" and "Asia/Tokyo".
     */
    timeZone: string

    /**
     * Calendar the event is stored in.
     */
    calendar: Calendar

    /**
     * Constructs an event.
     * In order to add the event to your calendar, you must call the save() function.
     */
    constructor()

    /**
     * Adds a recurrence rule.Recurrence rules specify when the eventer or reminder should be repeated. See the documentation of RecurrenceRule for more information on creating rules.
     * Parameters¶
     * recurrenceRule
     * RecurrenceRule
     * Recurrence rule to add to the reminder.
     */
    addRecurrenceRule(recurrenceRule: RecurrenceRule)

    /**
     * Removes all recurrence rules.
     */
    removeAllRecurrenceRules()

    /**
     * Saves event.
     * Saves changes to an event, inserting it into the calendar if it is newly created.
     */
    save()

    /**
     * Removes event from calendar.
     */
    remove()

    /**
     * Presents a view for editing the calendar event.The presented view supports editing various attributes of the event, including title, location, dates, recurrence and alerts.
     * Return value¶
     * Promise
     * Promise that provides the updated event when fulfilled.
     */
    presentEdit(): Promise<CalendarEvent>

    /**
     * Presents a view for creating a calendar event.The presented view supports editing various attributes of the event, including title, location, dates, recurrence and alerts.
     * Return value¶
     * Promise
     * Promise that provides the created event when fulfilled.
     */
    static presentCreate(): Promise<CalendarEvent>

    /**
     * Events occurring today.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static today(calendars: Calendar): Promise<[CalendarEvent][]>

    /**
     * Events occurring tomorrow.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static tomorrow(calendars: Calendar): Promise<[CalendarEvent][]>

    /**
     * Events that occurred yesterday.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static yesterday(calendars: Calendar): Promise<[CalendarEvent][]>

    /**
     * Events that occur this week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static thisWeek(calendars: Calendar): Promise<[CalendarEvent][]>

    /**
     * Events that occur next week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static nextWeek(calendars: Calendar): Promise<[CalendarEvent][]>

    /**
     * Events that occurred last week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static lastWeek(calendars: Calendar): Promise<[CalendarEvent][]>

    /**
     * Events that occurs between two dates.Parameters¶
     * startDate
     * Date
     * Start date to fetch events for.
     * endDate
     * Date
     * End date to fetch events for.
     * calendars
     * [Calendar]
     * Calendars to fetch events for. Defaults to all calendars.
     * Return value¶
     * Promise<[CalendarEvent]>
     * Promise that provides the events when fulfilled.
     */
    static between(startDate: Date, endDate: Date, calendars: Calendar): Promise<[CalendarEvent][]>
  } /** ---------CallbackURL --------
  Open x-callback-url requests.
Opens apps that support x-callback-url and waits for a response from the target application. You can find a list of apps that support x-callback-url at x-callback-url.com/apps.

---------CallbackURL --------
*/
  class CallbackURL {
    /**
     * Construct CallbackURL.Constructs an object that opens x-callback-url requests and waits for a response from the target app.
     * Parameters¶
     * baseURL
     * string
     * Base URL of the request. This is usally something like my-app://x-callback-url/action
     */
    constructor(baseURL: string)

    /**
     * Construct CallbackURL.Appends a key/value pair to the base URL as a query parameter. The name and value are automatically encoded. Do not add the x-callback-url paramters, i.e. x-source, x-success, x-error and x-cancel as Scriptable will add those.
     * Parameters¶
     * name
     * string
     * Name of the query parameter to add.
     * value
     * string
     * Value of the query parameter to add.
     */
    addParameter(name: string, value: string)

    /**
     * Opens the callback URL.Opens the target app and waits for the target app to perform the action. The returned promise contains the query parameters supplied by the target app when it invokes the callback. If the action failed in the target app or the action was cancelled, the promise will be rejected. The promise is also rejected if the action times out because the target app did not invoke the callback.
     * Return value¶
     * Promise<{string: string}>
     * Promise that provides the query parameters supplied by the target app when it invokes the callback.
     */
    open(): Promise<Record<string, string>>

    /**
     * Creates the callback URL.Creates a callback URL with the specified base URL and query parameters.
     * Return value¶
     * string
     * Configured callback URL.
     */
    getURL(): string
  } /** ---------Color --------
  Stores color data including opacity.
A color can be created using a hex value, e.g. #FF0000 and optionally an alpha or it can be created using the provided system colors.

---------Color --------
*/
  class Color {
    /**
     * HEX representation.
     * Read-only.
     */
    hex: string

    /**
     * Amount of red in the color.
     * Read-only.
     */
    red: number

    /**
     * Amount of green in the color.
     * Read-only.
     */
    green: number

    /**
     * Amount of blue in the color.
     * Read-only.
     */
    blue: number

    /**
     * Alpha of the color.
     * Read-only.
     */
    alpha: number

    /**
     * Constructs a black color.Return value¶
     * Color
     * A black color.
     */
    static black(): Color

    /**
     * Constructs a dark gray color.Return value¶
     * Color
     * A dark gray color.
     */
    static darkGray(): Color

    /**
     * Constructs a light gray color.Return value¶
     * Color
     * A light gray color.
     */
    static lightGray(): Color

    /**
     * Constructs a white color.Return value¶
     * Color
     * A white color.
     */
    static white(): Color

    /**
     * Constructs a gray color.Return value¶
     * Color
     * A gray color.
     */
    static gray(): Color

    /**
     * Constructs a red color.Return value¶
     * Color
     * A red color.
     */
    static red(): Color

    /**
     * Constructs a green color.Return value¶
     * Color
     * A green color.
     */
    static green(): Color

    /**
     * Constructs a blue color.Return value¶
     * Color
     * A blue color.
     */
    static blue(): Color

    /**
     * Constructs a cyan color.Return value¶
     * Color
     * A cyan color.
     */
    static cyan(): Color

    /**
     * Constructs a yellow color.Return value¶
     * Color
     * A yellow color.
     */
    static yellow(): Color

    /**
     * Constructs a magenta color.Return value¶
     * Color
     * A magenta color.
     */
    static magenta(): Color

    /**
     * Constructs a orange color.Return value¶
     * Color
     * A orange color.
     */
    static orange(): Color

    /**
     * Constructs a purple color.Return value¶
     * Color
     * A purple color.
     */
    static purple(): Color

    /**
     * Constructs a brown color.Return value¶
     * Color
     * A brown color.
     */
    static brown(): Color

    /**
     * Constructs a transparent color.Return value¶
     * Color
     * A transparent color.
     */
    static clear(): Color

    /**
     * Constructs a color.Constructs a new color with a hex value and optionally an alpha value. The hex value may specify the alpha value but this will be ignored if the alpha value parameter is provided. Examples of valid hex values: #ff0000, #00ff0080 #00f and #ff. The hashtag is optional.
     * Parameters¶
     * hex
     * string
     * Hex value.
     * alpha
     * number
     * Alpha value.
     */
    constructor(hex: string, alpha: number)
  } /** ---------config --------
  Configuration the script runs with.
Contains information about the configuration the script is currently being run under.

---------config --------
*/
  const config: {
    /**
     * Read-only.
     * Whether the script is running in the app.
     */
    runsInApp: boolean

    /**
     * Read-only.
     * Whether the script is running in the action extension.
     */
    runsInActionExtension: boolean

    /**
     * Read-only.
     * Whether the script is running with Siri.
     */
    runsWithSiri: boolean

    /**
     * Read-only.
     * Whether the script is running in a widget.
     */
    runsInWidget: boolean

    /**
     * Read-only.
     * Whether the script is running in a notification.
     */
    runsInNotification: boolean

    /**
     * Read-only.
     * Whether the script was run from the home screen. You can add a script to the home screen from the script settings.
     */
    runsFromHomeScreen: boolean

    /**
     * Read-only.
     * The size of the widget the script is running in.
     * Possible values are: small, medium, large and null. The value is null when the script is not running in a widget.
     */
    widgetFamily: string
  } /** ---------console --------
  Adds messages to the log.
The console can be used to log information when running your script. The log may be useful when debugging your script, e.g. to examine values of variables.

---------console --------
*/
  class console {
    /**
     * Logs a message to the console.The message will have a default appearance. Refer to console.error(message) to log errors.
     * You can also use the global function log(message) which is a shorthand for console.log.
     * Parameters¶
     * message
     * any
     * Message to log to the console.
     */
    static log(message: any)

    /**
     * Logs a warning message to the console.The message will have a distinctive appearance. Refer to console.log(message) to log informative messages and console.error(message) to log errors.
     * You can also use the global function logWarning(message) which is a shorthand for console.warn.
     * Parameters¶
     * message
     * any
     * Message to log to the console.
     */
    static warn(message: any)

    /**
     * Logs an error message to the console.The message will have a distinctive appearance. Refer to console.log(message) to log informative message and console.warn(message) to log warnings.
     * You can also use the global function logError(message) which is a shorthand for console.error.
     * Parameters¶
     * message
     * any
     * Message to log to the console.
     */
    static error(message: any)

    /**
     * Logs an error message to the console.
     * Deprecated in version 1.3. Use console.error(message) instead.The message will have a distinctive appearance. Refer to console.log(message) to log informative message and console.warn(message) to log warnings.
     * You can also use the global function logError(message) which is a shorthand for console.error.
     * Parameters¶
     * message
     * any
     * Message to log to the console.
     */
    static logError(message: any)
  } /** ---------Contact --------
  Contact in the address book.
The type represents a contact in the address book. You can use the type to fetch and update contacts in the address book. If you are signed into multiple accounts on the device, you may have multiple sources that populate the address book. A source is is represented as a ContactsContainer. A contact may be in only one container. A CardDAV account usually has a single container whereas an Exchange account may have multiple containers.

---------Contact --------
*/
  class Contact {
    /**
     * Uniquely identifies the contact on the device.
     * Read-only.
     */
    identifier: string

    /**
     * Name prefix.
     */
    namePrefix: string

    /**
     * Given name.
     */
    givenName: string

    /**
     * Middle name.
     */
    middleName: string

    /**
     * Family name.
     */
    familyName: string

    /**
     * Nickname.
     */
    nickname: string

    /**
     * Birthday.
     */
    birthday: Date

    /**
     * Profile picture.
     */
    image: Image

    /**
     * Email addresses.
     * An array of objects on the following form:
     * {
     *   "identifier": "UUID-ABC-123",
     *   "label": "Home",
     *   "localizedLabel": "Home",
     *   "value": "my@example.com"
     * }
     *
     * The identifier uniquely identifies the email address on this device. The label is a description of the email address and the value holds the email address itself.
     * When updating this property, you must set the entire array of email addresses that you would like to store on the contact. Each value in the array must have the "value" key. The other keys are optional.
     */
    emailAddresses: Record<string, string>[]

    /**
     * Phone numbers.
     * An array of objects on the following form:
     * {
     *   "identifier": "UUID-ABC-123",
     *   "label": "Home",
     *   "localizedLabel": "Home",
     *   "value": "(111)234-5678"
     * }
     *
     * The identifier uniquely identifies the phone number on this device. The label is a description of the phone number and the value holds the phone number itself.
     * When updating this property, you must set the entire array of phone numbers that you would like to store on the contact. Each value in the array must have the "value" key. The other keys are optional.
     */
    phoneNumbers: Record<string, string>[]

    /**
     * Postal addresses.
     * An array of objects on the following form:
     * {
     *   "identifier": "UUID-ABC-123",
     *   "label": "Home",
     *   "localizedLabel": "Home",
     *   "street": "240  Terry Lane",
     *   "city": "New York",
     *   "state": "New York",
     *   "postalCode": "10001",
     *   "country": "United States of America"
     * }
     *
     * The identifier uniquely identifies the pstal address on this device. The label is a description of the phone number and the value holds the phone number itself.
     * When updating this property, you must set the entire array of postal addresses that you would like to store on the contact. The "identifier" key is optional.
     */
    postalAddresses: Record<string, string>[]

    /**
     * Social profiles.
     * An array of objects on the following form:
     * {
     *   "identifier": "UUID-ABC-123",
     *   "label": "Twitter",
     *   "localizedLabel": "Twitter",
     *   "service": "Twitter",
     *   "url": "https://twitter.com/scriptableapp",
     *   "userIdentifier": null,
     *   "username": "scriptableapp"
     * }
     *
     * The identifier uniquely identifies the social profile on this device. The label is a description of the social profile, the service is the social profile's service name, the URL contains a link to the social profile, the userIdentifier is the identifier of the social profile and the username is the name for the social profile.
     * When updating this property, you must set the entire array of social profiles that you would like to store on the contact. The "identifier" key is optional.
     */
    socialProfiles: Record<string, string>[]

    /**
     * Note for the contact.
     * For security reasons, a contact's notes cannot be accessed in Siri, the Shortcuts app and in a notification.
     */
    note: string

    /**
     * URL addresses.
     * When updating this property, you must set the entire array of URL addresses that you would like to store on the contact. The "identifier" key is optional.
     */
    urlAddresses: Record<string, string>[]

    /**
     * Dates.
     * When updating this property, you must set the entire array of dates that you would like to store on the contact. The "identifier" key is optional.
     */
    dates: Record<string, any>[]

    /**
     * Name of the organization associated with the contact.
     */
    organizationName: string

    /**
     * Name of the department associated with the contact.
     */
    departmentName: string

    /**
     * The contact's job title.
     */
    jobTitle: string

    /**
     * Whether or not name prefix is available.
     * Read-only.
     * The namePrefix property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isNamePrefixAvailable: boolean

    /**
     * Whether or not given name is available.
     * Read-only.
     * The givenName property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isGiveNameAvailable: boolean

    /**
     * Whether or not middle name is available.
     * Read-only.
     * The middleName property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isMiddleNameAvailable: boolean

    /**
     * Whether or not family name is available.
     * Read-only.
     * The familyName property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isFamilyNameAvailable: boolean

    /**
     * Whether or not nickname is available.
     * Read-only.
     * The nickname property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isNicknameAvailable: boolean

    /**
     * Whether or not birthday is available.
     * Read-only.
     * The birthday property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isBirthdayAvailable: boolean

    /**
     * Whether or not email addresses are available.
     * Read-only.
     * The emailAddresses property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isEmailAddressesAvailable: boolean

    /**
     * Whether or not phone numbers are available.
     * Read-only.
     * The phoneNumbers property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isPhoneNumbersAvailable: boolean

    /**
     * Whether or not postal addresses are available.
     * Read-only.
     * The postalAddresses property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isPostalAddressesAvailable: boolean

    /**
     * Whether or not social profiles are available.
     * Read-only.
     * The socialProfiles property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isSocialProfilesAvailable: boolean

    /**
     * Whether or not image is available.
     * Read-only.
     * The image property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isImageAvailable: boolean

    /**
     * Whether or not note is available.
     * Read-only.
     * The note property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isNoteAvailable: boolean

    /**
     * Whether or not URL addresses are available.
     * Read-only.
     * The urlAddresses property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isURLAddressesAvailable: boolean

    /**
     * Whether or not organization name is available.
     * Read-only.
     * The organizationName property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isOrganizationNameAvailable: boolean

    /**
     * Whether or not department name is available.
     * Read-only.
     * The departmentName property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isDepartmentNameAvailable: boolean

    /**
     * Whether or not job title is available.
     * Read-only.
     * The jobTitle property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isJobTitleAvailable: boolean

    /**
     * Whether or not dates are available.
     * Read-only.
     * The date property may not be available if the container does not support it. In that case any value set on the property will be ignored.
     */
    isDatesAvailable: boolean

    /**
     * Constructs a contact.
     * In order to add the contact to your address book, you must queue it for insertion using Contact.add(). When you're done making changes to the address book you should call Contact.persistChanges() to persist the changes.
     */
    constructor()

    /**
     * Fetches contacts.Fetches the contacts in the specified containers. A contact can be in only one container.
     * Parameters¶
     * containers
     * [ContactsContainer]
     * Containers to fetch contacts from.
     * Return value¶
     * Promise<[Contact]>
     * Promise that provides the contacts when fulfilled.
     */
    static all(containers: ContactsContainer): Promise<[Contact][]>

    /**
     * Fetches contacts in groups.Fetches the contacts in the specified contacts groups. A contact may belong to many groups.
     * Parameters¶
     * groups
     * [ContactsGroup]
     * Groups to fetch contacts from.
     * Return value¶
     * Promise<[Contact]>
     * Promise that provides the contacts when fulfilled.
     */
    static inGroups(groups: ContactsGroup): Promise<[Contact][]>

    /**
     * Queues a contact to be added.After you have created a contact, you must queue the contact to be added to the address book and invoke Contact.persistChanges() to persist the changes to the address book.
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Parameters¶
     * contact
     * Contact
     * Contact to queue to be added.
     * containerIdentifier
     * string
     * Optional. Identifier of container to add the contact to. If null is specified, the contact will be added to the default container.
     */
    static add(contact: Contact, containerIdentifier: string)

    /**
     * Queues an update to a contact.After you have updated one or more properties on a contact, you must queue the contact to be updated and invoke Contact.persistChanges() to persist the changes to the address book.
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Parameters¶
     * contact
     * Contact
     * Contact to queue to be updated.
     */
    static update(contact: Contact)

    /**
     * Queues a contact to be deleted.To delete a contact, you must queue the contact for deletion and invoke Contact.persistChanges() to persist the changes to the address book.
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Parameters¶
     * contact
     * Contact
     * Contact to queue to be deleted.
     */
    static delete(contact: Contact)

    /**
     * Persist queued changes to the address book.Call this function to persist changes queued with Contact.add(), Contact.update() and Contact.delete().
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Return value¶
     * Promise
     * Promise that fulfills when the changes have been persisted. The promise carries no value.
     */
    static persistChanges(): Promise<void>
  } /** ---------ContactsContainer --------
  Collection of contacts.
If you're signed into multiple accounts on your device, you may have multiple contact containers. A contact can be in only one container. CardDAV accounts usually have a single container whereas Exchange accounts may have multiple containers. A container may have multiple groups. While a single contact can only belong to one container, a contact may belong to many groups.

---------ContactsContainer --------
*/
  class ContactsContainer {
    /**
     * Identifier of the contacts container.
     * Read-only.
     */
    identifier: string

    /**
     * Name of the contacts container.
     * Read-only.
     */
    name: string

    /**
     * Fetches default contacts container.Return value¶
     * Promise
     * Promise that provides the default contacts container when fulfilled.
     */
    static default(): Promise<ContactsContainer>

    /**
     * Fetches all contacts containers.Return value¶
     * Promise<[ContactsContainer]>
     * Promise that provides all contacts containers when fulfilled.
     */
    static all(): Promise<ContactsContainer[]>

    /**
     * Fetches a contacts container.Parameters¶
     * identifier
     * string
     * Identifier of the contacts container to fetch.
     * Return value¶
     * Promise
     * Promise that provides the contacts container when fulfilled.
     */
    static withIdentifier(identifier: string): Promise<ContactsContainer>
  } /** ---------ContactsGroup --------
  Group of contacts.
A contacts container may have several groups of contacts. A contact can only belong to a single contacts container but may belong to zero or more contacts groups. For example, an iCloud account has only one container but may have many groups.

---------ContactsGroup --------
*/
  class ContactsGroup {
    /**
     * Identifier of the contacts group.
     * Read-only.
     */
    identifier: string

    /**
     * Name of the contacts group.
     */
    name: string

    /**
     * Constructs a contacts group.
     * In order to add the group to your address book, you must queue it for insertion using ContactsGroup.add(). When you're done making changes to the address book you should call Contact.persistChanges() to persist the changes.
     */
    constructor()

    /**
     * Fetches contacts groups.Fetches the contacts groups in the specified containers. A group can be in only one container.
     * Parameters¶
     * containers
     * [ContactsContainer]
     * Container to fetch contacts groups from.
     * Return value¶
     * Promise<[ContactsGroup]>
     * Promise that provides the contacts groups when fulfilled.
     */
    static all(containers: ContactsContainer): Promise<[ContactsGroup][]>

    /**
     * Adds a contact to the group.In order to persist the change, you should call Contact.persistChanges(). It is important that the contact is added to the address book. To add the contact to the address book, you should queue it for insertion using Contact.add() before persisting the changes.
     * Parameters¶
     * contact
     * Contact
     * Contact to add to the group.
     */
    addMember(contact: Contact)

    /**
     * Removes a contact from the group.In order to persist the change, you should call Contact.persistChanges(). It is important that the contact is added to the address book. To add the contact to the address book, you should queue it for insertion using Contact.add() before persisting the changes.
     * Parameters¶
     * contact
     * Contact
     * Contact to add to the group.
     */
    removeMember(contact: Contact)

    /**
     * Queues a contacts group to be added.After you have created a group, you must queue the group to be added to the address book and invoke Contact.persistChanges() to persist the changes to the address book.
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Parameters¶
     * group
     * ContactsGroup
     * Contacts group to queue to be added.
     * containerIdentifier
     * string
     * Optional. Identifier of container to add the contacts group to. If null is specified, the group will be added to the default container.
     */
    static add(group: ContactsGroup, containerIdentifier: string)

    /**
     * Queues an update to a contacts group.After you have updated one or more properties on a contacts group, you must queue the group to be updated and invoke Contact.persistChanges() to persist the changes to the address book.
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Parameters¶
     * group
     * ContactsGroup
     * Contacts group to queue to be updated.
     */
    static update(group: ContactsGroup)

    /**
     * Queues a contacts group to be deleted.To delete a contacts group, you must queue the group for deletion and invoke Contact.persistChanges() to persist the changes to the address book.
     * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call Contact.persistChanges() when you want to persist the changes to the address book.
     * Parameters¶
     * group
     * ContactsGroup
     * Contacts group to queue to be deleted.
     */
    static delete(group: ContactsGroup)
  } /** ---------Data --------
  Raw data representation.
Raw data representation of strings, files and images.

---------Data --------
*/
  class Data {
    /**
     * Creates data from string.The provided string is assumed to be UTF8 encoded. If the string is not UTF8 encoded, the function will return null.
     * Parameters¶
     * string
     * string
     * String to create data from.
     * Return value¶
     * Data
     * Data representation of string.
     */
    static fromString(string: string): Data

    /**
     * Reads data from file path.Reads the raw data of the file at the specified file path.
     * Parameters¶
     * filePath
     * string
     * Path of file to read data from.
     * Return value¶
     * Data
     * Data representation of file.
     */
    static fromFile(filePath: string): Data

    /**
     * Creates data from base64 encoded string.The supplied string must be base64 encoded otherwise the function will return null.
     * Parameters¶
     * base64String
     * string
     * Base64 encoded string to create data from.
     * Return value¶
     * Data
     * Data representation of string.
     */
    static fromBase64String(base64String: string): Data

    /**
     * Creates data from JPEG image.Parameters¶
     * image
     * Image
     * JPEG image to convert to data.
     * Return value¶
     * Data
     * Data representation of image.
     */
    static fromJPEG(image: Image): Data

    /**
     * Creates data from PNG image.Parameters¶
     * image
     * Image
     * PNG image to convert to data.
     * Return value¶
     * Data
     * Data representation of image.
     */
    static fromPNG(image: Image): Data

    /**
     * Creates a string from the data.The data is assumed to represent a UTF8 encoded string. If the string is not UTF8 encoded string, the function will return null.
     * Return value¶
     * string
     * Data converted to string.
     */
    toRawString(): string

    /**
     * Creates a base64 encoded string.Creates a base64 encoded string from the data.
     * Return value¶
     * string
     * Base64 encoded string.
     */
    toBase64String(): string

    /**
     * Gets bytes from data.Return value¶
     * [number]
     * Array of bytes.
     */
    getBytes(): number[]
  } /** ---------DateFormatter --------
  Converts between dates and strings.
The date formatter can convert between dates and their textual representations.

---------DateFormatter --------
*/
  class DateFormatter {
    /**
     * Date format to be used by the formatter.
     * Sets a fixed format to be used by the formatter. For example the date "2019-08-26 16:47"\n can be represented using the format "yyyy-MM-dd HH:mm".
     * When converting dates to strings, it's advised to use some of the predefined formats for dates and times that can be applied using functions on the formatter, e.g. useMediumDateStyle() and useMediumTimeStyle().
     * Year:
     * y: Year with no padding. Example: "2019"
     * yy: Year with two zeros. Adds padding if necessary. Example: "19"
     * yyyy: Year with a minimum of four digits. Adds padding if necessary. Example: "2019"
     * Quarter:
     * Q: Quarter of the year. Example: "4"
     * QQQQ: Quarter spelled out. Example: "4th quarter"
     * Month:
     * M: Numeric month of the year. Example: "1"
     * MM: Numeric month of the year. Adds padding if necessary. Example: "01"
     * MMM: Shorthand name of the month. Example: "Jan"
     * MMMM: Full name of the month. Example: "January"
     * MMMMM: Narrow name of the month. Example: "J"
     * Day:
     * d: Day of the month. Example: "9"
     * dd: Day of the month. Adds padding if necessary. Example: "09"
     * F: Day of the week. Example: "3rd Friday in August"
     * E: Day of the week. Example: "Fri"
     * EEEE: Full name of the day. Example: "Friday"
     * EEEEE: Narrow day of the week. Example: "F"
     * Hour:
     * h: Hour on a 12-hour clock. Example: "9"
     * hh: Hour on a 12-hour clock. Adds padding if necessary. Example: "09"
     * H: Hour on a 24-hour clock. Example: "21"
     * HH: Hour on a 24-hour clock. Adds padding if necessary. Example: "21"
     * a: AM/PM for times on a 12-hour clock. Example: "PM"
     * Minute:
     * m: Minute. Example: "7"
     * mm: Minute. Adds padding if necessary. Example: "07"
     * Second:
     * s: Seconds. Example: "4"
     * ss: Seconds. Adds padding if necessary. Example: "04"
     * SSS: Milliseconds. Example: "384"
     * Time zone:
     * zzz: Three letter name of the time zone. Falls back to GMT-08:00 if the name is unknown. Example: "CST"
     * zzzz: Full name of the time zone. Falls back to GMT-08:00 if the name is unknown. Example: "Central Standard Time"
     * Z: Time zone in RFC 822 GMT format. Also matches a literal Z for Zulu (UTC) time. Example: "-0600"
     * ZZZZ: Time zone with abbreviation and offset. Example: "CST-06:00"
     * ZZZZZ: Time zone in ISO 8601 format. Example: "-06:00"
     * A great resource for experimenting with date formats is nsdateformatter.com developed by Ben Scheirman.
     */
    dateFormat: string

    /**
     * Locale to use when formatting.
     * The locale should be specified using a string identifier, e.g. "en", "it" or "da". When no locale is set, the formatter will use the current locale of the device.
     */
    locale: string

    /**
     * Constructs a date formatter.
     * To convert between dates and their textual representation, use the string() and date() functions.
     */
    constructor()

    /**
     * Creates a string from a date.Parameters¶
     * date
     * Date
     * The date to convert to a string.
     * Return value¶
     * string
     * A textual representation of the date.
     */
    string(date: Date): string

    /**
     * Creates a date from a string.Uses the date formatters configuration to parse the string into a date. If the string cannot be parsed with the date foramtters configuration, the function will return null.
     * Parameters¶
     * str
     * string
     * The string to parse into a date.
     * Return value¶
     * string
     * A date representation of the string or null if the string could not be parsed.
     */
    date(str: string): string

    /**
     * Use no style for the date.
     * This will remove the date from the formatted string.
     */
    useNoDateStyle()

    /**
     * Use a short style for the date.
     * Dates with a short style are typically numeric only e.g. "08/23/19".
     */
    useShortDateStyle()

    /**
     * Use a medium style for the date.
     * Dates with a medium style usually includes abbreviations, e.g. "Aug 23, 2019" or "7:16:42 PM".
     */
    useMediumDateStyle()

    /**
     * Use a long style for the date.
     * Dates with a long style usually includes a full text, e.g. "August 23, 2019".
     */
    useLongDateStyle()

    /**
     * Use a full style for the date.
     * Dates with a full style includes all details, e.g. "Friday, August 23, 2019 AD".
     */
    useFullDateStyle()

    /**
     * Use no style for the time.
     * This will remove the time from the formatted string.
     */
    useNoTimeStyle()

    /**
     * Use a short style for the time.
     * Times with a short style are typically numeric only but also includes the period for 12-hour clocks, e.g. "7:17 PM".
     */
    useShortTimeStyle()

    /**
     * Use a short style for the time.
     * Times with a medium style usually includes abbreviations, e.g. "7:16:42 PM".
     */
    useMediumTimeStyle()

    /**
     * Use a long style for the time.
     * Times with a long style usually includes a full text, e.g. "7:16:42 PM PST".
     */
    useLongTimeStyle()

    /**
     * Use a full style for the time.
     * Times with a full style includes all details, e.g. "7:16:42 PM Pacific Standard Time".
     */
    useFullTimeStyle()
  } /** ---------DatePicker --------
  Presents a date picker.
Use the date picker to select a date. After configuring the date picker, call pickTime(), pickDate(), pickDateAndTime() or pickCountDownTimer() which will present the date picker modally. The pickTime(), pickDate() and pickDateAndTime() methods returns a promise that carries the selected date and the pickCountDownTimer() method retrns a promise that carries the selected duration.
The date picker can be configured towards picking a date with or without time, just a time or picking hours and minutes for a timer.

---------DatePicker --------
*/
  class DatePicker {
    /**
     * Minimum date that is selected in the picker.
     * The minimum date, along with the maximum date, specifies the valid date range. The minimum and maximum dates are ignored if the minimum date is greater than the maximum date. The dates are also ignored in countdown-timer mode.
     */
    minimumDate: Date

    /**
     * Maximum date that is selected in the picker.
     * The maximum date, along with the minimum date, specifies the valid date range. The minimum and maximum dates are ignored if the minimum date is greater than the maximum date. The dates are also ignored in countdown-timer mode.
     */
    maximumDate: Date

    /**
     * Countdown duration displayed by the date picker.
     * Use this property to get and set the duration of a countdown when calling the pickCountDownDuration() function to present the picker. The default value is zero and the maximum value is 23:59 (86,399 seconds).
     */
    countdownDuration: number

    /**
     * Interval at which the date picker displays minutes.
     * Use the property to set the interval of the minute wheel. The default and minimum value is 1 and the maximum value is 30.
     */
    minuteInterval: number

    /**
     * The initially selected date.
     * Use this property to specify the initially selected date and time when picking a date, a time or both using date picker. If no date is specified, the current date and time will be selected initially.
     * Be aware that this property does not hold the selected date after the date picker has been dismissed. The promises returned by pickTime(), pickDate() and PickDateAndTime() carries the selected date.
     */
    initialDate: Date

    /**
     * Constructs a new date picker.
     * Use the date picker to present a view for selecting a date.
     * The date picker can be configured towards picking a date with or without time, just a time or picking hours and minutes for a timer.
     */
    constructor()

    /**
     * Presents the date picker displaying hours and minutes.Use the method to pick a time. The date picker will display hours and minutes and, depending on the locale of the device, an AM/PM designation.
     * The returned date will be the current date with the hour and minute set to the selected values. Use the initialDate property to set the initially selected date.
     * Return value¶
     * Promise
     * Promise that carries the selected time when fulfilled.
     */
    pickTime(): Promise<Date>

    /**
     * Presents the date picker displaying day, month and year.Use the method to pick a date. The date picker will display the, day, month and year. Use the initialDate property to set the initially selected date.
     * Return value¶
     * Promise
     * Promise that carries the selected date when fulfilled.
     */
    pickDate(): Promise<Date>

    /**
     * Presents the date picker displaying date and time.Use the method to pick a date and a time. The date picker will display the day, month, year, hour, minutes and, depending on the locale of the device, an AM/PM designation. Use the initialDate property to set the initially selected date.
     * Return value¶
     * Promise
     * Promise that carries the selected date and time when fulfilled.
     */
    pickDateAndTime(): Promise<Date>

    /**
     * Presents the date picker for selecting the duration of a countdown.Use the method to pick the duration of a countdown, e.g. a timer. The date picker will display hours and minutes. Use the countdownDuration property to set the initially selected duration.
     * Return value¶
     * Promise
     * Promise that carries the selected duration when fulfilled.
     */
    pickCountdownDuration(): Promise<number>
  } /** ---------Device --------
  Provides information about the device.
Reads information about the current device and its screen.

---------Device --------
*/
  class Device {
    /**
     * Name identifying the device.
     * You can find and edit the name of your device in the system settings.
     */
    static name(): string

    /**
     * Name of the operating system:
     */
    static systemName(): string

    /**
     * Version of the operating system.
     */
    static systemVersion(): string

    /**
     * Model of the device, e.g. "iPhone".
     */
    static model(): string

    /**
     * Whether the device is a phone.
     * You can use this property to choose behavior of a script depending on whether its running on a phone or a pad.
     */
    static isPhone(): boolean

    /**
     * Whether the device is a pad.
     * You can use this property to choose behavior of a script depending on whether its running on a phone or a pad.
     */
    static isPad(): boolean

    /**
     * Size of the screen.
     * The value is measured in points. For an explanation of the relationship between points and pixels, see the documentation of the screenScale() method. The value takes the device rotation into account, so the value will vary between portrait and landscape.
     */
    static screenSize(): Size

    /**
     * Resolution of the screen.
     * The value is measured in pixels. The value does not take the rotation of the deviec into account.
     */
    static screenResolution(): Size

    /**
     * Scale of the screen.
     * Standard resolution displays have a scale of 1.0 where one point on the screen equals one pixel. Retina displays will have a scale factor of 2.0 or 3.0 where one point on the screen is four or nine pixels, respectively.
     */
    static screenScale(): number

    /**
     * Brightness of the screen in percentage.
     * The value range from 0 to 1. To set the screen brightness, refer to the setScreenBrightness() function.
     */
    static screenBrightness(): number

    /**
     * Whether the device is in portrait with the home button or home indicator at the bottom.
     */
    static isInPortrait(): boolean

    /**
     * Whether the device is in portrait but upside down with the home button or home indicator at the top.
     */
    static isInPortraitUpsideDown(): boolean

    /**
     * Whether the device is in landscape with the home button or home indicator on the right side.
     */
    static isInLandscapeLeft(): boolean

    /**
     * Whether the device is in landscape with the home button or home indicator on the left side.
     */
    static isInLandscapeRight(): boolean

    /**
     * Whether the device is lying parallel to the ground with the screen facing upwards.
     */
    static isFaceUp(): boolean

    /**
     * Whether the device is lying parallel to the ground with the screen facing downwards.
     */
    static isFaceDown(): boolean

    /**
     * Current battery level.
     * The value is in percentage ranging between 0 and 1.
     */
    static batteryLevel(): number

    /**
     * Whether the device is being not plugged into power and thus discharging.
     */
    static isDischarging(): boolean

    /**
     * Whether the device is being charged.
     */
    static isCharging(): boolean

    /**
     * Whether the device is fully charged.
     */
    static isFullyCharged(): boolean

    /**
     * The preferred langauges.
     * The list is ordered according to the language preferences specified in the system settings.
     */
    static preferredLanguages(): string[]

    /**
     * Identifier for the device locale.
     */
    static locale(): string

    /**
     * Identifier for the device language.
     */
    static language(): string

    /**
     * Whether the device is using dark appearance.
     * This API is not supported in widgets.
     */
    static isUsingDarkAppearance(): boolean

    /**
     * The device volume.
     * The value range from 0 to 1.
     */
    static volume(): number

    /**
     * Sets the brightness of the screen.The value range from 0 to 1. To get the screen brightness, refer to the screenBrightness() function.
     * Parameters¶
     * percentage
     * number
     * Percentage to set the screen brightness to. Value between 0 and 1.
     */
    static setScreenBrightness(percentage: number)
  } /** ---------Dictation --------
  Presents an interface for dictation.
Presents an interface that lets you dictate a text. You can specify the locale of the text you want to dictate when calling the start() function. Dictation must manually be stopped from the presented interface when you are finished dictating.

---------Dictation --------
*/
  class Dictation {
    /**
     * Starts dictation.Presents an interface that shows the dictated string. Press "Done" when you are done dictating the text.
     * Parameters¶
     * locale
     * string
     * Optional string identifier that specifies the language to dictate in. E.g. "en" for English, "it" for Italian and "da" for Danish. Defaults to the locale of the device.
     * Return value¶
     * Promise
     * Promise that provides the dictated text when fulfilled.
     */
    static start(locale: string): Promise<string>
  } /** ---------DocumentPicker --------
  Presents a document picker.
Use this to present a picker that allows opening a document from Files app or exporting a document to Files app. When opening a document, the picker will prompt you to select one or more documents after which you will get the path for the documents. Use the FileManager to read the content of these files. When exporting a document, the picker will ask you to select a destination to store the document.

---------DocumentPicker --------
*/
  class DocumentPicker {
    /**
     * Opens a document.Presents a document picker for opening a document from the Files app. It is up to the user to specify which types of files can be opened. Types are specified as UTIs, e.g. "public.plain-text" or "public.image". If you want to open a file of any file type, see the openFile function and if you want to open a folder, see the openFolder function.
     * When fulfilled the returned promise will provide the paths for the selected documents. Use an instance of FileManager to read the contents of the files.
     * Parameters¶
     * types
     * [string]
     * Types of files to select. Specified using UTIs. Defaults to all files.
     * Return value¶
     * Promise<[string]>
     * Promise that provides paths for the selected documents when fulfilled.
     */
    static open(types: string): Promise<[string][]>

    /**
     * Opens a file of any file type.Presents a document picker for opening a file from the Files app. The document picker will allow the selection of any file.
     * When fulfilled the returned promise will provide the paths for the selected files.
     * Return value¶
     * Promise
     * Promise that provides paths for the selected files when fulfilled.
     */
    static openFile(): Promise<string>

    /**
     * Opens a folder.Presents a document picker for opening a folder from the Files app.
     * When fulfilled the returned promise will provide the paths for the selected files.
     * Return value¶
     * Promise
     * Promise that provides paths for the selected folders when fulfilled.
     */
    static openFolder(): Promise<string>

    /**
     * Exports a file to a document.Exports the file to a document with. A picker prompting for a destination to export the document to is presented.
     * Parameters¶
     * path
     * string
     * Path of the file to export.
     * Return value¶
     * Promise<[string]>
     * Promise that provides paths for the selected file destination when fulfilled.
     */
    static export(path: string): Promise<string[]>

    /**
     * Exports a string to a document.Exports a string to a new file. The name of the file can optionally be specified. A picker prompting for a destination to export the document to is presented.
     * Parameters¶
     * content
     * string
     * Content of the document to export.
     * name
     * string
     * Optional name of the document to export.
     * Return value¶
     * Promise<[string]>
     * Promise that provides the path of the selected destination when fulfilled.
     */
    static exportString(content: string, name: string): Promise<string[]>

    /**
     * Exports an image.Exports an image to a new file. The name of the file can optionally be specified. A picker prompting for a destination to export the document to is presented.
     * Parameters¶
     * image
     * Image
     * Image to export.
     * name
     * string
     * Optional name of the image to export.
     * Return value¶
     * Promise<[string]>
     * Promise that provides the path of the selected destination when fulfilled.
     */
    static exportImage(image: Image, name: string): Promise<string[]>

    /**
     * Exports data.Exports data to a new file. The name of the file can optionally be specified. A picker prompting for a destination to export the document to is presented.
     * Parameters¶
     * data
     * Data
     * Data to export.
     * name
     * string
     * Optional name of the image to export.
     * Return value¶
     * Promise<[string]>
     * Promise that provides the path of the selected destination when fulfilled.
     */
    static exportData(data: Data, name: string): Promise<string[]>
  } /** ---------DrawContext --------
  Context for drawing images.
An instance of DrawContext is a canvas on which you can draw an image using shapes, texts and other images. You must specify the size of your canvas by setting the size property. At any point after beginning your drawing and before ending your drawing can you call getImage() to get an image object of your drawing. When you are done drawing your image, you should call endDrawing().

---------DrawContext --------
*/
  class DrawContext {
    /**
     * Size of canvas.
     * Specifies the size of the canvas on which you are drawing. The image returned by getImage() will have this exact size, except if respectScreenScale is true.
     */
    size: Size

    /**
     * Enable to respect the scale of the screen.
     * Devices have a screen scale that is used to convert between the logical coordinate space and the device coordinate space. For example, retina screens have a screen scale of 2 or 3 meaning that one point in the logical coordinate space is represented by four or nine pixels. Respecting the screen scale will multiply the specified size of the canvas by the screen scale. For example a canvas of size 200 by 200 will be 600 by 600 when the image is rendered on a retina screen with a screen scale of 3. When respecting the screen scale is disabled, you may experience that your images looks blurry because essentially the size you have specified will be stretched when rendered on the screen. Default is false.
     */
    respectScreenScale: boolean

    /**
     * Determines whether the context is opaque.
     * When enabled your image will be rendered opaque. Default is true.
     */
    opaque: boolean

    /**
     * Constructs a canvas to draw on.
     * Constructs a new canvas to draw images, shapes and texts on.
     */
    constructor()

    /**
     * Retrieves the image.Call this to retrieve the image you have drawn to the context. Note that this should be called before calling endDrawing().
     * Return value¶
     * Image
     * The image drawn to the context.
     */
    getImage(): Image

    /**
     * Draws an image in the specified rect.Draws the image in the rectangle. The image will be scaled to fit within the rectangle.
     * Parameters¶
     * image
     * Image
     * Image to draw.
     * rect
     * Rect
     * Rectangle to draw the image in.
     */
    drawImageInRect(image: Image, rect: Rect)

    /**
     * Draws an image at the specified point.Draws the image at the point. The top-left corner of the image will be drawn at the specified point.
     * Parameters¶
     * image
     * Image
     * Image to draw.
     * point
     * Point
     * Point at which to draw top-left corner of the image.
     */
    drawImageAtPoint(image: Image, point: Point)

    /**
     * Sets the fill color.Sets the fill color to be used when performing a fill operation. Any fill operation performed afterwards will fill with the specified color until another call to setFillColor is made.
     * Parameters¶
     * color
     * Color
     * Color to set for filling.
     */
    setFillColor(color: Color)

    /**
     * Sets the stroke color.Sets the stroke color to be used when performing a stroke operation. Any stroke operation performed afterwards will stroke with the specified color until another call to setStrokeColor is made.
     * Parameters¶
     * color
     * Color
     * Color to set for stroking.
     */
    setStrokeColor(color: Color)

    /**
     * Sets the line width for stroking.Sets the line width to be used when performing a stroke operation.
     * Parameters¶
     * width
     * number
     * Line width to use for stroking.
     */
    setLineWidth(width: number)

    /**
     * Fills a rectangle.Fills the rectangle with the color set when calling setFillColor.
     * Parameters¶
     * rect
     * Rect
     * Rectangle to fill.
     */
    fill(rect: Rect)

    /**
     * Fills a rectangle.Fills the rectangle with the color set when calling setFillColor.
     * Parameters¶
     * rect
     * Rect
     * Rectangle to fill.
     */
    fillRect(rect: Rect)

    /**
     * Fills an ellipse.Fills the ellipse that fits within the supplied rectangle with the color set when calling setFillColor.
     * Parameters¶
     * rect
     * Rect
     * Rectangle incapsulating the ellipse to fill.
     */
    fillEllipse(rect: Rect)

    /**
     * Strokes a rectangle.Draws a line around the rectangle using the color set when calling setStrokeColor. The line will have the width set when calling setLineWidth.
     * Parameters¶
     * rect
     * Rect
     * Rectangle to stroke.
     */
    stroke(rect: Rect)

    /**
     * Strokes a rectangle.Draws a line around the rectangle using the color set when calling setStrokeColor. The line will have the width set when calling setLineWidth.
     * Parameters¶
     * rect
     * Rect
     * Rectangle to stroke.
     */
    strokeRect(rect: Rect)

    /**
     * Strokes an ellipse.Draws a line around the ellipse that fits within the supplied rectangle. The line will have the color set when calling setStrokeColor and the width set when calling setLineWidth.
     * Parameters¶
     * rect
     * Rect
     * Rectangle incapsulating the ellipse to stroke.
     */
    strokeEllipse(rect: Rect)

    /**
     * Adds a path to the context.After adding a path to the context, the path can be stroked or filled by calling strokePath and fillPath. Note that only the path that was added latest will be affected by calls to strokePath and fillPath.
     * Parameters¶
     * path
     * Path
     * Path to add to the context.
     */
    addPath(path: Path)

    /**
     * Strokes the path that was added the latest.
     * The path that was added the latest to the context is stroked with the color set using setStrokeColor and the line width set using setLineWidth.
     */
    strokePath()

    /**
     * Fills the path that was added the latest.
     * The path that was latest added to the context is filled with the color set using setFillColor.
     */
    fillPath()

    /**
     * Draws text at a position.Call this to draw a text string to the context. The top-left of the text will be drawn at the specified position.
     * Parameters¶
     * text
     * string
     * Text to draw.
     * pos
     * Point
     * Position to draw the top-left of the text.
     */
    drawText(text: string, pos: Point)

    /**
     * Draws text in a rectangle.Call this to draw a text string in a rectangle. Specify how the text should be aligned within the rectangle by calling setTextAlignedLeft, setTextAlignedCenter or setTextAlignedRight before drawing the text.
     * Parameters¶
     * text
     * string
     * Text to draw.
     * rect
     * Rect
     * Rectangle to draw text in.
     */
    drawTextInRect(text: string, rect: Rect)

    /**
     * Sets the font size used when drawing text.
     * Deprecated in version 1.5. Use the setFont() function instead.Sets the font size to be used when drawing texts to the context.
     * Parameters¶
     * size
     * number
     * Font size to use when drawing text.
     */
    setFontSize(size: number)

    /**
     * Sets the font to use when drawing text.Sets the font to be used when drawing texts to the context.
     * Parameters¶
     * font
     * Font
     * Font to use when drawing text.
     */
    setFont(font: Font)

    /**
     * Sets the text color used when drawing text.Sets the text color to be used when drawing text strings to the context.
     * Parameters¶
     * color
     * Color
     * Color to use when drawing text.
     */
    setTextColor(color: Color)

    /**
     * Specifies that texts should be left aligned.
     * Sets text alignment to left. Texts drawn after calling this will be left aligned inside the provided rectangle.
     */
    setTextAlignedLeft()

    /**
     * Specifies that texts should be center aligned.
     * Sets text alignment to center. Texts drawn after calling this will be center aligned inside the provided rectangle.
     */
    setTextAlignedCenter()

    /**
     * Specifies that texts should be right aligned.
     * Sets text alignment to right. Texts drawn after calling this will be right aligned inside the provided rectangle.
     */
    setTextAlignedRight()
  } /** ---------FileManager --------
  Read and write files on disk.
A FileManager lets you read files stored on the disk and make changes to them. Paths to files are supplied as strings.

---------FileManager --------
*/
  class FileManager {
    /**
     * Creates a local FileManager.Creates a file manager for operating with files stored locally.
     * Return value¶
     * FileManager
     * Local FileManager.
     */
    static local(): FileManager

    /**
     * Creates an iCloud FileManager.Creates a file manager for operating with files stored in iCloud. iCloud must be enabled on the device in order to use this.
     * Return value¶
     * FileManager
     * iCloud FileManager.
     */
    static iCloud(): FileManager

    /**
     * Read contents of a file as data.Reads the contents of the file specified by the file path as raw data. To read the file as a string see readString(filePath) and to read it as an image see readImage(filePath).
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of the file to read.
     * Return value¶
     * Data
     * Contents of the file as a data or null if the file could not be read.
     */
    read(filePath: string): Data

    /**
     * Read contents of a file as string.The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of the file to read.
     * Return value¶
     * string
     * Contents of the file as a string or null if the file could not be read.
     */
    readString(filePath: string): string

    /**
     * Read contents of a file as an image.Reads the contents of the file specified by the file path and converts it to an image.
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of the file to read.
     * Return value¶
     * Image
     * Contents of the file as an image or null if the file could not be read.
     */
    readImage(filePath: string): Image

    /**
     * Write data to a file.Parameters¶
     * filePath
     * string
     * Path of file to write to.
     * content
     * Data
     * Data to write to disk.
     */
    write(filePath: string, content: Data)

    /**
     * Write a string to a file.Writes the content to the specified file path on disk. If the file does not already exist, it will be created. If the file already exists the contents of the file will be overwritten with the new content.
     * Parameters¶
     * filePath
     * string
     * Path of file to write to.
     * content
     * string
     * Content to write to disk.
     */
    writeString(filePath: string, content: string)

    /**
     * Write an image to a file.Writes the image to the specified file path on disk. If the file does not already exist, it will be created. If the file already exists the contents of the file will be overwritten with the new content.
     * Parameters¶
     * filePath
     * string
     * Path of file to write to.
     * image
     * Image
     * Image to write to disk.
     */
    writeImage(filePath: string, image: Image)

    /**
     * Removes a file.Removes the file at the specified path. Use with caution. Removed files cannot be restored.
     * Parameters¶
     * filePath
     * string
     * Path of file to remove.
     */
    remove(filePath: string)

    /**
     * Moves a file.Moves the file from the source path to the destination path. Caution: This operation will replace any existing file at the the destination.
     * Parameters¶
     * sourceFilePath
     * string
     * Path of the file to move.
     * destinationFilePath
     * string
     * Path to move the file to.
     */
    move(sourceFilePath: string, destinationFilePath: string)

    /**
     * Copies a file.Copies the file from the source path to the destination path. If a file already exists at the destination file path, the operation will fail and the file will not be copied.
     * Parameters¶
     * sourceFilePath
     * string
     * Path of the file to copy.
     * destinationFilePath
     * string
     * Path to copy the file to.
     */
    copy(sourceFilePath: string, destinationFilePath: string)

    /**
     * Checks if the file exists.Checks if the file exists at the specified file path. Checking this before moving or copying to a destination can be a good idea as those operations will replace any existing file at the destination file path.
     * Parameters¶
     * filePath
     * string
     * File path to examine.
     * Return value¶
     * bool
     * True if the file exists otherwise false.
     */
    fileExists(filePath: string): boolean

    /**
     * Checks if a path points to a directory.Parameters¶
     * path
     * string
     * Path to examine.
     * Return value¶
     * bool
     * True if the path points to a directory otherwise false.
     */
    isDirectory(path: string): boolean

    /**
     * Creates a directory at the specified path.You can optionally create all intermediate directories.
     * Parameters¶
     * path
     * string
     * Path of directory to create.
     * intermediateDirectories
     * bool
     * Whether to create all intermediate directories. Defaults to false.
     */
    createDirectory(path: string, intermediateDirectories: boolean)

    /**
     * Path of temporary directory.Used to retrieve the path of a temporary directory on disk. The operating system may at any time delete files stored in this directory and therefore you should not rely on it for long time storage. If you need long time storage, see documentsDirectory() or libraryDirectory(). This directory is not shared between the app, the action extension and Siri.
     * Return value¶
     * string
     * Path to temporary directory.
     */
    temporaryDirectory(): string

    /**
     * Path of documents directory.Used to retrieve the path to the documents directory. Your scripts are stored in this directory. If you have iCloud enabled, your scripts will be stored in the documents directory in iCloud otherwise they will be stored in the local documents directory. The directory can be used for long time storage. Documents stored in this directory can be accessed using the Files app. Files stored in the local documents directory will not appear in the Files app.
     * Return value¶
     * string
     * Path to documents directory.
     */
    documentsDirectory(): string

    /**
     * Path of library directory.Used to retrieve the path to the library directory. The directory can be used for long time storage. Documents stored in this directory cannot be accessed using the Files app.
     * Return value¶
     * string
     * Path to library directory.
     */
    libraryDirectory(): string

    /**
     * Joins two path components.Joins two paths to created one path. For example to join the path to a directory with the name of a file. This is the suggested approach for creating new file paths passed to the read and write functions of a FileManager.
     * Parameters¶
     * lhsPath
     * string
     * Left-hand side part of the new path.
     * rhsPath
     * string
     * Right-hand side part of the new path.
     * Return value¶
     * string
     * Path with the two path components joined.
     */
    joinPath(lhsPath: string, rhsPath: string): string

    /**
     * Reads all tags from a file.The tags are read from the file at the specified path. Tags can either be read, added and removed using the Files app by using the APIs provided by a FileManager.
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of file to read tags from.
     * Return value¶
     * [string]
     * Read tags.
     */
    allTags(filePath: string): string[]

    /**
     * Adds a tag to a file.A tag can only be added to a file once. It is not possible to specify a color for the tag. You can create the tags using the Files app to specify the color and then add them to files afterwards using the FileManager API.
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of file to add the tag to.
     * tag
     * string
     * Tag to add. This can be an existing tag or a new tag.
     */
    addTag(filePath: string, tag: string)

    /**
     * Removes a tag from a file.The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of file to remove the tag from.
     * tag
     * string
     * Tag to remove.
     */
    removeTag(filePath: string, tag: string)

    /**
     * Reads an extended attribute from a file.Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
     * The function will return null if the attribute does not exist.
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of file to read extended attribute from.
     * name
     * string
     * Name of the extended attribute to read.
     * Return value¶
     * string
     * Value of the extended attribute.
     */
    readExtendedAttribute(filePath: string, name: string): string

    /**
     * Writes an extended attribute to a file.Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of file to add an extended attribute to.
     * value
     * string
     * Value of the extended attribute.
     * name
     * string
     * Name of the extended attribute. This is used to retrieve the value at a later point.
     */
    writeExtendedAttribute(filePath: string, value: string, name: string)

    /**
     * Removes an extended attribute from a file.Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
     * The function will error if the file does not exist or if it exists in iCloud but has not been download. Use fileExists(filePath) to check if a file exists and downloadFileFromiCloud(filePath) to download the file. Note that it is always safe to call downloadFileFromiCloud(filePath), even if the file is stored locally on the device.
     * Parameters¶
     * filePath
     * string
     * Path of file to add an extended attribute to.
     * name
     * string
     * Name of the extended attribute to remove.
     */
    removeExtendedAttribute(filePath: string, name: string)

    /**
     * Reads all extended attributes on a file.Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
     * Parameters¶
     * filePath
     * string
     * Path of file to read extended attributes from.
     * Return value¶
     * [string]
     * An array of all extended attributes.
     */
    allExtendedAttributes(filePath: string): string[]

    /**
     * Gets the UTI of the specified file.The Uniform Type Identifier is a string that identifies the type of file.
     * Parameters¶
     * filePath
     * string
     * Path of file to get UTI of.
     * Return value¶
     * string
     * The UTI of the file.
     */
    getUTI(filePath: string): string

    /**
     * Lists content of directory.Lists all the contents in the specified directory. The returned array contains file paths to all files in the directory.
     * Parameters¶
     * directoryPath
     * string
     * Path to directory.
     * Return value¶
     * [string]
     * File paths to all files in the directory.
     */
    listContents(directoryPath: string): string[]

    /**
     * Get name of a file.Takes a file path and returns the name of the file. Also supports getting the name of a directory. The returned file name optionally includes the extension of the file.
     * Parameters¶
     * filePath
     * string
     * path of file to get name of.
     * includeFileExtension
     * bool
     * Whether or not the file extension should be included. Defaults to false.
     * Return value¶
     * string
     * Name of the file.
     */
    fileName(filePath: string, includeFileExtension: boolean): string

    /**
     * Get extension of a file.Takes a file path and returns the extension of the file, e.g. ".jpg" or ".js". Returns en empty string for directories.
     * Parameters¶
     * filePath
     * string
     * Path of file to get extension from.
     * Return value¶
     * string
     * Extension of the file.
     */
    fileExtension(filePath: string): string

    /**
     * Get path to a bookmarked file or folder.Gets the path to a bookmarked file or filder. Use file bookmarks to access files and folders outside Scriptables documents directory.
     * You can edit your file bookmarks from Scriptables settings.
     * The function will throw an error if the bookmark doesn't exist.
     * Please beware that bookmarks created from Scriptables settings only can be used when running a script in the app and not from the Share Sheet, Siri and Shortcuts. If you wish to use a bookmark from Siri or the Shortcuts app, the bookmark must be created using Scriptables "Create File Bookmark" shortcut action using the Shortcuts app.
     * Parameters¶
     * name
     * string
     * Name of bookmark to create path for.
     * Return value¶
     * string
     * Path to the bookmarked file or folder.
     */
    bookmarkedPath(name: string): string

    /**
     * Check if a bookmark exists.Checks if a file bookmark exists with the specified name.
     * You can edit your file bookmarks from Scriptables settings.
     * Please beware that bookmarks created from Scriptables settings only can be used when running a script in the app and not from the Share Sheet, Siri and Shortcuts. If you wish to use a bookmark from Siri or the Shortcuts app, the bookmark must be created using Scriptables "Create File Bookmark" shortcut action using the Shortcuts app.
     * Parameters¶
     * name
     * string
     * Name of bookmark.
     * Return value¶
     * bool
     * True of a bookmark exists for the specified name, otherwise false.
     */
    bookmarkExists(name: string): boolean

    /**
     * Download file from iCloud if necessary.Downloads the file from iCloud if it have not already been downloaded. If you pass in a path to a file that is not stored in iCloud, the returned promise will be resolved immediately making it safe to pass in any file path.
     * Parameters¶
     * filePath
     * string
     * Path of file to download from iCloud.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the file have been downloaded.
     */
    downloadFileFromiCloud(filePath: string): Promise<void>

    /**
     * Checks if a file is stored in iCloud.Checks if a file is stored in iCloud or locally on the device. The function returns false if the file does not exist. Check if a file exists using fileExists(filePath)
     * Parameters¶
     * filePath
     * string
     * Path of file.
     * Return value¶
     * bool
     * True if the file is stored in iCloud otherwise false.
     */
    isFileStoredIniCloud(filePath: string): boolean

    /**
     * Checks if a file have been downloaded.If a file is stored in iCloud and it has not been downloaded, this function returns false. In that case, the file can be downloaded using downloadFileFromiCloud(filePath. If the file is not stored in iCloud but rather locally on the device, this function returns true.
     * The function returns false if the file does not exist. Check if a file exists using fileExists(filePath)
     * Parameters¶
     * filePath
     * string
     * Path of file.
     * Return value¶
     * bool
     * True if the file have been downloaded otherwise false.
     */
    isFileDownloaded(filePath: string): boolean

    /**
     * Reads the creation date of a file.The returned value will be null if the creation date cannot be read.
     * Parameters¶
     * filePath
     * string
     * Path of file.
     * Return value¶
     * Date
     * The date the file was created.
     */
    creationDate(filePath: string): Date

    /**
     * Reads the modification date of a file.The returned value will be null if the modification date cannot be read.
     * Parameters¶
     * filePath
     * string
     * Path of file.
     * Return value¶
     * Date
     * The date the file was last modified.
     */
    modificationDate(filePath: string): Date

    /**
     * Size of the file in kilobytes.The returned value will be null if the file size cannot be read.
     * Parameters¶
     * filePath
     * string
     * Path of file.
     * Return value¶
     * number
     * The file size measured in kilobytes.
     */
    fileSize(filePath: string): number

    /**
     * Reads all file bookmarks created in settings.
     * File bookmarks are used to bookmark a file or a folder and read or write to it later. File bookmarks are created from Scriptables settings.
     * This function returns all file bookmarks as an array of objects that take the following form.
     * {
     *   "name": "My Bookmark",
     *   "source": "host"
     * }
     *
     * The source can either be host for file bookmarks that can be used in the app or siri_shortcuts for file bookmarks that can be used in Siri and Shortcuts.
     */
    allFileBookmarks(): Record<string, string>[]
  } /** ---------Font --------
  Represents a font and text size.
The font can be used to style texts, for example in widgets.

---------Font --------
*/
  class Font {
    /**
     * Constructs a new font.Refer to iosfonts.com for a list of the fonts that are available in iOS and iPadOS.
     * Parameters¶
     * name
     * string
     * Name of the font.
     * size
     * number
     * Size of the font.
     */
    constructor(name: string, size: number)

    /**
     * Preferred font for large titles.Return value¶
     * Font
     * Preferred font.
     */
    static largeTitle(): Font

    /**
     * Preferred font for first level hierarchical headings.Return value¶
     * Font
     * Preferred font.
     */
    static title1(): Font

    /**
     * Preferred font for second level hierarchical headings.Return value¶
     * Font
     * Preferred font.
     */
    static title2(): Font

    /**
     * Preferred font for third level hierarchical headings.Return value¶
     * Font
     * Preferred font.
     */
    static title3(): Font

    /**
     * Preferred font for headings.Return value¶
     * Font
     * Preferred font.
     */
    static headline(): Font

    /**
     * Preferred font for subheadings.Return value¶
     * Font
     * Preferred font.
     */
    static subheadline(): Font

    /**
     * Preferred font for body texts.Return value¶
     * Font
     * Preferred font.
     */
    static body(): Font

    /**
     * Preferred font for callouts.Return value¶
     * Font
     * Preferred font.
     */
    static callout(): Font

    /**
     * Preferred font for footnotes.Return value¶
     * Font
     * Preferred font.
     */
    static footnote(): Font

    /**
     * Preferred font for standard captions.Return value¶
     * Font
     * Preferred font.
     */
    static caption1(): Font

    /**
     * Preferred font for alternate captions.Return value¶
     * Font
     * Preferred font.
     */
    static caption2(): Font

    /**
     * Creates a system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static systemFont(size: number): Font

    /**
     * Creates an ultra light system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static ultraLightSystemFont(size: number): Font

    /**
     * Creates a thin system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static thinSystemFont(size: number): Font

    /**
     * Creates a light system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static lightSystemFont(size: number): Font

    /**
     * Creates a regular system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static regularSystemFont(size: number): Font

    /**
     * Creates a medium system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static mediumSystemFont(size: number): Font

    /**
     * Creates a semibold system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static semiboldSystemFont(size: number): Font

    /**
     * Creates a bold system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static boldSystemFont(size: number): Font

    /**
     * Creates a heavy system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static heavySystemFont(size: number): Font

    /**
     * Creates a font with the system appearance with the black weight.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static blackSystemFont(size: number): Font

    /**
     * Creates an italic system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static italicSystemFont(size: number): Font

    /**
     * Creates an ultra light monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static ultraLightMonospacedSystemFont(size: number): Font

    /**
     * Creates a thin monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static thinMonospacedSystemFont(size: number): Font

    /**
     * Creates a light monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static lightMonospacedSystemFont(size: number): Font

    /**
     * Creates a regular monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static regularMonospacedSystemFont(size: number): Font

    /**
     * Creates a medium monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static mediumMonospacedSystemFont(size: number): Font

    /**
     * Creates a semibold monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static semiboldMonospacedSystemFont(size: number): Font

    /**
     * Creates a bold monospaced system font..Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static boldMonospacedSystemFont(size: number): Font

    /**
     * Creates a heavy monospaced system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static heavyMonospacedSystemFont(size: number): Font

    /**
     * Creates a monospaced system font with the black weight.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static blackMonospacedSystemFont(size: number): Font

    /**
     * Creates an ultra light and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static ultraLightRoundedSystemFont(size: number): Font

    /**
     * Creates a thin and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static thinRoundedSystemFont(size: number): Font

    /**
     * Creates a light and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static lightRoundedSystemFont(size: number): Font

    /**
     * Creates a regular and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static regularRoundedSystemFont(size: number): Font

    /**
     * Creates a medium and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static mediumRoundedSystemFont(size: number): Font

    /**
     * Creates a semibold and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static semiboldRoundedSystemFont(size: number): Font

    /**
     * Creates a bold and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static boldRoundedSystemFont(size: number): Font

    /**
     * Creates a heavy and rounded system font.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static heavyRoundedSystemFont(size: number): Font

    /**
     * Creates a rounded system font with the black weight.Parameters¶
     * size
     * number
     * Size of the text.
     * Return value¶
     * Font
     * Font.
     */
    static blackRoundedSystemFont(size: number): Font
  } /** ---------Image --------
  Manages image data.
Images objects contains image data. APIs in Scriptable that work with images, either by taking an image as input or returning an image, will use this the Image type.

---------Image --------
*/
  class Image {
    /**
     * Size of the image in pixels.
     * Read-only.
     */
    size: Size

    /**
     * Creates an image from file.Loads an image from the specified file path. If the image could not be read, the function will return null.
     * Parameters¶
     * filePath
     * string
     * File path to read image from.
     * Return value¶
     * Image
     * The read image or null if the image could not be read.
     */
    static fromFile(filePath: string): Image

    /**
     * Creates an image from raw data.Loads an image from the raw data. If the image could not be read, the function will return null.
     * Parameters¶
     * data
     * Data
     * Data to read image from.
     * Return value¶
     * Image
     * The read image or null if the image could not be read.
     */
    static fromData(data: Data): Image
  }
  const importModule: (name: string) => void
  /** ---------Keychain --------
  Secure storage for credentials.
The keychain is a secure storage for credentials, keys etc. Use the set() method to add values to the keychain. You can then later use the get() method to retrieve the value.

---------Keychain --------
*/
  class Keychain {
    /**
     * Check if keychain contains a key.Checks if the keychain contains the specified key.
     * Parameters¶
     * key
     * string
     * Key to look up in the keychain.
     * Return value¶
     * bool
     * True if the key exists in the keychain, otherwise false.
     */
    static contains(key: string): boolean

    /**
     * Add value for a specified key to keychain.Adds the value to the keychain, assigning it to the specified key. If the key already exists in the keychain, the value is overwritten.
     * Values are securely stored in an encrypted database.
     * Parameters¶
     * key
     * string
     * Key which the value should be assigned to.
     * value
     * string
     * Value to assign to the specified key.
     */
    static set(key: string, value: string)

    /**
     * Reads a value from the keychain.Reads the value for the specified key. If the key doesn't exist the method will throw an error. Used the contains method to check if a key exists in the keychain.
     * Parameters¶
     * key
     * string
     * Key to read value for.
     * Return value¶
     * string
     * Value assigned to the specified key.
     */
    static get(key: string): string

    /**
     * Remove key from keychain.Parameters¶
     * key
     * string
     * Key to remove from the keychain.
     */
    static remove(key: string)
  } /** ---------LinearGradient --------
  Linear gradient.
A linear gradient to be used in a widget.

---------LinearGradient --------
*/
  class LinearGradient {
    /**
     * Colors of the gradient.
     * The array of colors should include the same amount of elements as the gradients locations property.
     */
    colors: Color[]

    /**
     * Locations of each color.
     * Each location should be a value in the range of 0 to 1 and indicates the location of each color in the gradients colors array.
     * The array of locations should include the same amount of elements as the gradients colors property.
     */
    locations: number[]

    /**
     * Constructs a linear gradient.
     */
    constructor()
  } /** ---------ListWidget --------
  Widget showing a list of elements.
A widget showing a list of elements. Pass the widget to Script.setWidget() display it on your Home screen.
Be aware that the widget will refresh periodically and the rate at which the widget refreshes is largely determined by the operating system.
Also note that there are memory limitations when running a script in a widget. When using too much memory the widget will crash and not render correctly.

---------ListWidget --------
*/
  class ListWidget {
    /**
     * Background color of the widget.
     */
    backgroundColor: Color

    /**
     * Background image.
     */
    backgroundImage: Image

    /**
     * Background gradient.
     */
    backgroundGradient: LinearGradient

    /**
     * Spacing between elements.
     * Specifies the spacing between elements in the widget. You can also use the addSpacer() function on the widget to add spacing between elements. Defaults to 0.
     */
    spacing: number

    /**
     * URL to open.
     * The URL will be opened when the widget is tapped. This will override any behavior defined in the configuration of the widget. E.g. if the widget is configured to run the script when interacting with the widget but a URL is set the URL will take precedence.
     */
    url: string

    /**
     * Earliest date to refresh the widget.
     * The property indicates when the widget can be refreshed again. The widget will not be refreshed before the date have been reached. It is not guaranteed that the widget will refresh at exactly the specified date.
     * The refresh rate of a widget is partly up to iOS/iPadOS. For example, a widget may not refresh if the device is low on battery or the user is rarely looking at the widget.
     * When the property is null the default refresh interval is used. Defaults to null.
     */
    refreshAfterDate: Date

    /**
     * Constructs a new list widget.
     * A widget showing a list of elements. Pass the widget to Script.setWidget() to display it on your Home screen.
     */
    constructor()

    /**
     * Add text to the widget.Adds a text element to the widget. Use the properties on the returned element to style the text.
     * Return value¶
     * WidgetText
     * Text element.
     */
    addText(text: string): WidgetText

    /**
     * Add date to the widget.Adds a date element to the widget. Use the properties on the returned element to style the date.
     * Return value¶
     * WidgetDate
     * Date element.
     */
    addDate(date: Date): WidgetDate

    /**
     * Add image to the widget.Adds an image element to the widget. Use the properties on the returned element to style the image.
     * Return value¶
     * WidgetImage
     * Image element.
     */
    addImage(image: Image): WidgetImage

    /**
     * Add spacer.Adds a spacer to the widget. This can be used to offset the content vertically in the widget.
     * Parameters¶
     * length
     * number
     * Length of the spacer. Pass null to create a spacer with a flexible length.
     * Return value¶
     * WidgetSpacer
     * Spacer element.
     */
    addSpacer(length: number): WidgetSpacer

    /**
     * Add stack.Adds a stack to the widget. Stacks layout elements horizontally by default.
     * Return value¶
     * WidgetStack
     * Stack element.
     */
    addStack(): WidgetStack

    /**
     * Set padding.Sets the padding on each side of the widget.
     * Parameters¶
     * top
     * number
     * Padding on the top edge.
     * leading
     * number
     * Padding on the leading edge.
     * bottom
     * number
     * Padding on the bottom edge.
     * trailing
     * number
     * Padding on the trailing edge.
     */
    setPadding(top: number, leading: number, bottom: number, trailing: number)

    /**
     * Use the default padding.
     * Configure the widget to use the default padding. Any padding previously defined with setPadding() will be discarded.
     */
    useDefaultPadding()

    /**
     * Presents a preview of the widget.The widget is presented in its small size.
     * Widgets on the Home screen are updated periodically so while working on your widget you may want to preview it in the app.
     * Return value¶
     * Promise
     * Promsie that is fulfilled when the preview is dismissed.
     */
    presentSmall(): Promise<void>

    /**
     * Presents a preview of the widget.The widget is presented in its medium size.
     * Widgets on the Home screen are updated periodically so while working on your widget you may want to preview it in the app.
     * Return value¶
     * Promise
     * Promsie that is fulfilled when the preview is dismissed.
     */
    presentMedium(): Promise<void>

    /**
     * Presents a preview of the widget.The widget is presented in its large size.
     * Widgets on the Home screen are updated periodically so while working on your widget you may want to preview it in the app.
     * Return value¶
     * Promise
     * Promsie that is fulfilled when the preview is dismissed.
     */
    presentLarge(): Promise<void>
  } /** ---------Location --------
  Fetches your location.
Uses GPS, WiFi and cellular hardware to determine your location. The first time you use the API, the application will prompt you to authorize access to your location. If you do not authorize access, the application cannot fetch your location. You can change this later from the system settings.

---------Location --------
*/
  class Location {
    /**
     * Fetches your location.Your location is fetched using GPS, WiFi and cellular hardware. The object carried by the promise includes the latitude, longitude and altitude as well as the horizontal and vertical accuracy measured in meters.
     * Return value¶
     * Promise<{string: number}>
     * Promise providing an object containing information about your location.
     */
    static current(): Promise<Record<string, number>>

    /**
     * Uses best accuracy. This is default.
     * Set this when you want to achieve the best possible accuracy when retrieving your location. This is the default accuracy.
     */
    static setAccuracyToBest()

    /**
     * Sets accuracy to within ten meters.
     */
    static setAccuracyToTenMeters()

    /**
     * Sets accuracy to within hundred meters.
     */
    static setAccuracyToHundredMeters()

    /**
     * Sets accuracy to within one kilometer.
     */
    static setAccuracyToKilometer()

    /**
     * Sets accuracy to within three kilometers.
     */
    static setAccuracyToThreeKilometers()

    /**
     * Performs reverse-geocoding for a location.A reverse-geocoding request fetches information about the current location. The data is delivered by Apples geocoding service.
     * Parameters¶
     * latitude
     * number
     * Latitude of coordinate to fetch information about.
     * longitude
     * number
     * Longitude of coordinate to fetch information about.
     * locale
     * string
     * Optional. Preferred locale to fetch information in. Uses the default locale of the device if null.
     * Return value¶
     * [{string: any}]
     * Promise that carries all available information about the address when resolved.
     */
    static reverseGeocode(latitude: number, longitude: number, locale: string): Record<string, any>[]
  } /** ---------Mail --------
  Sends a mail.
Presents UI for sending a mail.

---------Mail --------
*/
  class Mail {
    /**
     * Recipients of the mail.
     * Array of recipients to send the mail to. Elements in the array should be e-mail addresses. You will have a chance to modify this before the mail is sent.
     */
    toRecipients: string[]

    /**
     * Recipients to set CC on the mail.
     * Array of recipients to set as CC on the mail. Elements in the array should be e-mail addresses. You will have a chance to modify this before the mail is sent.
     */
    ccRecipients: string[]

    /**
     * Recipients to set BCC on the mail.
     * Array of recipients to set as BCC on the mail. Elements in the array should be e-mail addresses. You will have a chance to modify this before the mail is sent.
     */
    bccRecipients: string[]

    /**
     * Subject of the mail.
     * Subject of the mail to send. You will have a chance to modify this before the mail is sent.
     */
    subject: string

    /**
     * Body of the mail.
     * Body of the mail to send. You will have a chance to modify this before the mail is sent.
     */
    body: string

    /**
     * Whether body is HTML.
     * Set to true if the body of the mail is HTML. Defaults to false.
     */
    isBodyHTML: boolean

    /**
     * Preferred email address to use in the from field.
     * Sets the preferred email addressed to use when sending the mail. If no account with the preferred email address is set up, the default email address is used.
     */
    preferredSendingEmailAddress: string

    /**
     * Constructs a mail.
     */
    constructor()

    /**
     * Send the mail.Presents a screen from which the mail can be sent. The mail will not be sent until you have confirmed it from the presented screen.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the mail have been sent or saved.
     */
    send(): Promise<void>

    /**
     * Adds an image attachment to the mail.Parameters¶
     * image
     * Image
     * Image to add to the mail.
     */
    addImageAttachment(image: Image)

    /**
     * Adds a file attachment to the mail.Parameters¶
     * filePath
     * string
     * Path of file to add to the mail.
     */
    addFileAttachment(filePath: string)

    /**
     * Adds a data attachment to the mail.When adding a data attachment to the mail, you are responsible for providing a valid MIME type and filename. It is advised to use addImageAttachment and addFileAttachment whenever possible.
     * Parameters¶
     * data
     * Data
     * Data representation of file to add to the mail.
     * mimeType
     * string
     * MIME type of file represented by the data.
     * filename
     * string
     * Name of the file represented by the data.
     */
    addDataAttachment(data: Data, mimeType: string, filename: string)
  } /** ---------Message --------
  Sends a message.
Presents UI for sending a message.

---------Message --------
*/
  class Message {
    /**
     * Recipients of the message.
     * Array of recipients to send the message to. Elements in the array should be phone numbers. You will have a chance to modify this before the message is sent.
     */
    recipients: string[]

    /**
     * Body of the message.
     * Body of the message to send. You will have a chance to modify this before the message is sent.
     */
    body: string

    /**
     * Constructs a message.
     * Constructs a message to be sent either as a text message or an iMessage.
     */
    constructor()

    /**
     * Send the message.Presents a screen from which the message can be sent. The message will not be sent until you have confirmed it from the presented screen.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the message have been sent.
     */
    send(): Promise<void>

    /**
     * Adds an image attachment to the message.Parameters¶
     * image
     * Image
     * Image to add to the message.
     */
    addImageAttachment(image: Image)

    /**
     * Adds a file attachment to the message.Parameters¶
     * filePath
     * string
     * Path of file to add to the message.
     */
    addFileAttachment(filePath: string)

    /**
     * Adds a data attachment to the message.When adding a data attachment to the message, you are responsible for providing a valid Uniform Type Identifier and filename. It is advised to use addImageAttachment and addFileAttachment whenever possible.
     * Parameters¶
     * data
     * Data
     * Data representation of file to add to the message.
     * uti
     * string
     * UTI of file represented by the data.
     * filename
     * string
     * Name of the file represented by the data.
     */
    addDataAttachment(data: Data, uti: string, filename: string)
  } /** ---------module --------
  The current module.
Scriptable treats each file as a module. Consider the following file.
let circle = importModule('circle')
let r = 2
let area = circle.area(r)
log('Area of circle: ' + area)

The file imports the module circle.js which has the following contents.
module.exports.area = (r) => {
  return Math.PI * Math.pow(r, 2)
}

module.exports.circumference = (r) => {
  return 2 * Math.PI * r
}

The circle.js module exports the functions area and circumference. You can add any function or object to the exports of a module to make them available when the module is imported with importModule.

---------module --------
*/
  const module: {
    /**
     * Path to file containing the module.
     * Read-only.
     * This is the absolute path to the file containing the module.
     */
    filename: string

    /**
     * Exported functions and modules.
     * Values assigned to exports are returned by the global importModule function when the module is imported.
     * exports can be of any type but by default it is an empty object. Consider the following example which exports the area and circumference functions.
     * module.exports.area = (r) => {
     *   return Math.PI * Math.pow(r, 2)
     * }
     *
     * module.exports.circumference = (r) => {
     *   return 2 * Math.PI * r
     * }
     *
     * Alternatively if you only need to export a single function or object, you can assign directly to the exports property as shown in the following examples.
     * module.exports = (r) => {
     *   return 2 * Math.PI * r
     * }
     *
     * module.exports = "My string"
     */
    exports: any
  } /** ---------Notification --------
  Schedules and manages notifications.
Notifications are scheduled for delivery at some point in the future. A notification may be delivered even when Scriptable is not running.

---------Notification --------
*/
  class Notification {
    /**
     * Identifier of the notification.
     * To reschedule a notification, use the identifier of an existing notification.
     */
    identifier: string

    /**
     * Title of the notification.
     */
    title: string

    /**
     * Subtitle of the notification.
     */
    subtitle: string

    /**
     * Body of the notification.
     */
    body: string

    /**
     * Preferred height of the notification.
     * By default Scriptable attempts to determine an appropriate height for your notification. If you want to override the default behavior, you can specify a preferred content height. The preferred content height is only used when running a script inside the notification, i.e. when scriptName is not null. iOS may limit the height of the notification in which case the preferred content height is not guaranteed to be respected.
     */
    preferredContentHeight: number

    /**
     * Number to display in the app icon's badge.
     * When the number is zero, no badge is displayed. When the number is greater than zero, the number is displayed in the app icon's badge. Setting the value to null, will leave the badge unchanged. The default value is null.
     */
    badge: number

    /**
     * Identifier for grouping the notification.
     * Notifications are grouped by the identifier on the Home screen and in the Notification Center.
     */
    threadIdentifier: string

    /**
     * Custom information.
     * Store any custom information for the notification. This can be accessed from the Notification.opened property when a script is run from a notification.
     */
    userInfo: Record<string, any>

    /**
     * Sound of the notification.
     * Set to null if you do not want any sound. Set to one of the following values if you want a sound.
     * default
     * accept
     * alert
     * complete
     * event
     * failure
     * piano_error
     * piano_success
     * popup
     * By default the notification is delivered with no sound.
     */
    sound: string

    /**
     * URL to open when notification is tapped.
     * The Scriptable application will open the URL when the notification is tapped. This can be a URL that uses Scriptables URL scheme, the URL scheme of another application or a website URL.
     */
    openURL: string

    /**
     * Delivery date of the notification.
     * Read-only.
     * If the notification has already been delivered, for example because it was fetched using Notification.allDelivered(), the deliveryDate will be populated. Otherwise it will be null.
     * The property cannot be set. In order to specify a future delivery date for a notification, see the setTriggerDate function. For recurring notifications, see the setDailyTrigger and setWeeklyTrigger functions.
     */
    deliveryDate: Date

    /**
     * Next trigger date of the notification.
     * Read-only.
     * The next trigger date is the point in time where the next notification will be delivered.
     * The property cannot be set. In order to specify a future delivery date for a notification, see the setTriggerDate function. For recurring notifications, see the setDailyTrigger and setWeeklyTrigger functions.
     */
    nextTriggerDate: Date

    /**
     * Name of script to run in rich notification.
     * When notification is force touched or long pressed, Scriptable can run a script inside the notification without opening the app. Set the scriptName to a name of an existing script to run it inside the notification.
     */
    scriptName: string

    /**
     * Actions added to the notification.
     * Read-only.
     * An array of objects on the following form:
     * {
     *   "title": "Open Website",
     *   "url": "https://scriptable.app"
     * }
     *
     * To add a notification, use Notification.addAction.
     */
    actions: Record<string, string>

    /**
     * Notification a script is running in.
     * Deprecated in version 1.3. Use args.notification instead.The notification that a script is being run in or the application was opened from.
     * The notification contains all information that was set when the notification was originally scheduled, including the userInfo property which can be used to contain custom data that might be relevant when running the script.
     * Return value¶
     * Notification
     * The notification that a script is running in.
     */
    static current(): Notification

    /**
     * Constructs a notification.
     */
    constructor()

    /**
     * Schedules the notification.When a new notification is constructed, it must be scheduled, otherwise it will not be delivered. If an existing notification is modified, it must also be scheduled again for the changes to take effect.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the notification have been scheduled.
     */
    schedule(): Promise<void>

    /**
     * Removes the notification.Removes all future triggers of the notification.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the notification have been removed.
     */
    remove(): Promise<void>

    /**
     * Sets the notification to be triggered on a date and time.Parameters¶
     * date
     * Date
     * Date and time to trigger the notification on.
     */
    setTriggerDate(date: Date)

    /**
     * Sets the notification to be triggered daily.Sets the notification to be triggered on a specific time of the day. When the notification repeats, it will be sent at the same time on all future days. If the notification is not repating it will be sent on the next occurrence of the specified time.
     * Parameters¶
     * hour
     * number
     * Hour of the day to trigger the notification.
     * minute
     * number
     * Minute of the day to trigger the notification.
     * repeats
     * bool
     * If true the notification will be sent daily on the specified time, otherwise it will only be sent once. Defaults to false.
     */
    setDailyTrigger(hour: number, minute: number, repeats: boolean)

    /**
     * Sets the notification to be triggered weekly.Sets the notification to be triggered on a specific day of the week and a specific time of that day. When the notification repeats, it will be sent at the same time on all future days. If the notification is not repating it will be sent on the next occurrence of the specified time.
     * Parameters¶
     * weekday
     * number
     * Day of the week to trigger the notification.
     * hour
     * number
     * Hour of the day to trigger the notification.
     * minute
     * number
     * Minute of the day to trigger the notification.
     * repeats
     * bool
     * If true the notification will be sent daily on the specified time, otherwise it will only be sent once. Defaults to false.
     */
    setWeeklyTrigger(weekday: number, hour: number, minute: number, repeats: boolean)

    /**
     * Adds an action button.Actions are shown as buttons in the notification. When screen space is unlimited, the system shows up to 10 actions. When the space is limited the system shows at most two actions.
     * Parameters¶
     * title
     * string
     * Title of the action.
     * url
     * string
     * URL to open when choosing the action.
     * destructive
     * bool
     * Optional. If set to true, the button is displayed with special highlighting to indicate that it performs a destructive task. Defaults to false.
     */
    addAction(title: string, url: string, destructive: boolean)

    /**
     * All pending notifications.Fetches all notifications that have been scheduled from Scriptable and are waiting to be delivered.
     * Return value¶
     * Promise<[Notification]>
     * Promise that carries all pending notifications when fulfilled.
     */
    static allPending(): Promise<Notification[]>

    /**
     * Delivered notifications displayed in the Notification Center.Fetches all notifications that have been scheduled from Scriptable and that are still displayed in the Notification Center of iOS.
     * Return value¶
     * Promise<[Notification]>
     * Promise that carries all delivered notifications when fulfilled.
     */
    static allDelivered(): Promise<Notification[]>

    /**
     * Removes all pending notifications.Removes all notifications that have been scheduled from Scriptable and are waiting to be delivered.
     * Use with caution. This removes all notifications scheduled across all of your scripts and the action cannot be undone.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the notifications have been removed.
     */
    static removeAllPending(): Promise<void>

    /**
     * Removes all delivered notifications.Removes all notifications that have been scheduled from Scriptable and that are still displayed in the Notification Center of iOS.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the notifications have been removed.
     */
    static removeAllDelivered(): Promise<void>

    /**
     * Removes pending notifications.Removes notifications with the specified identifiers. The notifications are only removed if they are pending, that is they have been scheduled and are waiting to be delivered. To remove delivered notifications, see Notification.removeDelivered().
     * Return value¶
     * Promise
     * Promise that is fulfilled when the notifications have been removed.
     */
    static removePending(identifiers: string[]): Promise<void>

    /**
     * Removes delivered notifications.Removes notifications with the specified identifiers. The notifications are only removed if they have been delivered. To remove pending notifications, see Notification.removePending().
     * Return value¶
     * Promise
     * Promise that is fulfilled when the notifications have been removed.
     */
    static removeDelivered(identifiers: string[]): Promise<void>

    /**
     * Resets the current notification.
     * Effectively sets args.notification to null.
     * When a notification scheduled from Scriptable has been tapped to open the app or while the app was open, args.notification will have a value until Scriptable is quit. You can manually reset the value using Notification.resetCurrent.
     */
    static resetCurrent()
  } /** ---------Pasteboard --------
  Copy and paste strings or images.
Copy and paste strings and images to and from the pasteboard.

---------Pasteboard --------
*/
  class Pasteboard {
    /**
     * Copies a string to the pasteboard.Parameters¶
     * string
     * string
     * The string to copy to the pasteboard.
     */
    static copy(string: string)

    /**
     * Pastes a string from the pasteboard.Return value¶
     * string
     * String in the pasteboard or null if no string is in the pasteboard.
     */
    static paste(): string

    /**
     * Copies a string to the pasteboard.Parameters¶
     * string
     * string
     * The string to copy to the pasteboard.
     */
    static copyString(string: string)

    /**
     * Pastes a string from the pasteboard.Return value¶
     * string
     * String in the pasteboard or null if no string is in the pasteboard.
     */
    static pasteString(): string

    /**
     * Copies an image to the pasteboard.Parameters¶
     * image
     * Image
     * The image to copy to the pasteboard.
     */
    static copyImage(image: Image)

    /**
     * Pastes an image from the pasteboard.Return value¶
     * Image
     * Image in the pasteboard or null if no image is in the pasteboard.
     */
    static pasteImage(): Image
  } /** ---------Path --------
  A path describes a shape.
Shapes can be descriped using a path. Use an instance of Path to create complex shapes that can be drawn to a DrawContext.

---------Path --------
*/
  class Path {
    /**
     * Constructs a path.
     * Use the methods on the path to create complex shapes.
     */
    constructor()

    /**
     * Moves to a point.Moves to a point without drawing a line between the current point and the new point.
     * Parameters¶
     * point
     * Point
     * Point to move to.
     */
    move(point: Point)

    /**
     * Adds a line to a point.Add a line from the current point, e.g. set using the move method, and to the new point.
     * Parameters¶
     * point
     * Point
     * Point to add line to.
     */
    addLine(point: Point)

    /**
     * Adds a rectangle.This is a convenience function for adding a rectangle to the path starting from the lower left corner and drawing the lines counter-clockwise until the rectangle is closed.
     * Parameters¶
     * rect
     * Rect
     * Rectangle to add.
     */
    addRect(rect: Rect)

    /**
     * Adds an ellipse.Adds an ellipse incapsulated by the provided rectangle to the path.
     * Parameters¶
     * rect
     * Rect
     * Rectangle incapsulating the ellipse.
     */
    addEllipse(rect: Rect)

    /**
     * Adds a rounded rectangle.Adds a rounded rectangle to the path. The corner width specifies the horizontal size of the corner and the corner height specifies the the vertical size of the corner.
     * Parameters¶
     * rect
     * Rect
     * Rectangle to add.
     * cornerWidth
     * number
     * Horizontal size of the rounded corner.
     * cornerHeight
     * number
     * Vertical size of the rounded corner.
     */
    addRoundedRect(rect: Rect, cornerWidth: number, cornerHeight: number)

    /**
     * Adds a cubic curve to a point.Adds a cubic Bézier curve to the path with the specified end point and control points.
     * Parameters¶
     * point
     * Point
     * End point of the curve.
     * control1
     * Point
     * First control point of the curve.
     * control2
     * Point
     * Second control point of the curve.
     */
    addCurve(point: Point, control1: Point, control2: Point)

    /**
     * Adds a quadratic curve to a point.Adds a quadratic Bézier curve to the specified end point with the specified control point.
     * Parameters¶
     * point
     * Point
     * End point of the curve.
     * control
     * Point
     * Control point of the curve.
     */
    addQuadCurve(point: Point, control: Point)

    /**
     * Adds a set of lines.Adds straight lines between an array of points. Calling this method is equivalent to calling the move function with the first point in the array of points and then calling addLine on the subsequent points in the array.
     * Parameters¶
     * points
     * [Point]
     * Points to add lines between.
     */
    addLines(points: Point[])

    /**
     * Adds a set of rectangles.Calling this is equivalent to repeatedly calling addRect.
     * Parameters¶
     * rects
     * [Rect]
     * Rectangles to add.
     */
    addRects(rects: Rect[])

    /**
     * Closes a sub path.
     * Adds a straight line from the current point to the start of the current subpath.
     */
    closeSubpath()
  } /** ---------Photos --------
  Provides access to your photo library.
In order to read from your photo library, you must grant the app access to your photo library. The first time you use the APIs, the app will prompt for access but if you deny the request, all API calls will fail. In that case you must enable access to the photo library from the system settings.

---------Photos --------
*/
  class Photos {
    /**
     * Presents the photo library for picking an image.Use this for picking an image from the photo library.
     * Return value¶
     * Promise
     * Promise that provide the selected image when fulfilled.
     */
    static fromLibrary(): Promise<Image>

    /**
     * Opens the camera for taking an image.Use this for taking a new image using the camera.
     * Return value¶
     * Promise
     * Promise that provide the captured image when fulfilled.
     */
    static fromCamera(): Promise<Image>

    /**
     * Get latest photo.Reads the latest photo from your photo library. If no photo is available, the promise will be rejected.
     * Return value¶
     * Promise
     * Promise that provides the photo when fulfilled.
     */
    static latestPhoto(): Promise<Image>

    /**
     * Get latest photos.Reads the latests photos from your photo library. If no photo is available, the promise will be rejected.
     * Parameters¶
     * count
     * number
     * Number of photos to fetch.
     * Return value¶
     * Promise<[Image]>
     * Promise that provides the photos when fulfilled.
     */
    static latestPhotos(count: number): Promise<Image[]>

    /**
     * Get latest screenshot.Reads the latest screenshot from your photo library. If no screenshot is available, the promise will be rejected.
     * Return value¶
     * Promise
     * Promise that provides the screenshot when fulfilled.
     */
    static latestScreenshot(): Promise<Image>

    /**
     * Get latest screenshots.Reads the latests screenshots from your photo library. If no screenshot is available, the promise will be rejected.
     * Parameters¶
     * count
     * number
     * Number of screenshots to fetch.
     * Return value¶
     * Promise<[Image]>
     * Promise that provides the screenshots when fulfilled.
     */
    static latestScreenshots(count: number): Promise<Image[]>

    /**
     * Removes latest photo.
     * Before removing the photo, an alert is shown prompting you to confirm the removal.
     */
    static removeLatestPhoto()

    /**
     * Removes latest photos.Before removing the photos, an alert is shown prompting you to confirm the removal.
     * Parameters¶
     * count
     * number
     * Number of photos to remove.
     */
    static removeLatestPhotos(count: number)

    /**
     * Removes latest screenshot.
     * Before removing the screenshot, an alert is shown prompting you to confirm the removal.
     */
    static removeLatestScreenshot()

    /**
     * Removes latest screenshots.Before removing the screenshots, an alert is shown prompting you to confirm the removal.
     * Parameters¶
     * count
     * number
     * Number of screenshots to remove.
     */
    static removeLatestScreenshots(count: number)

    /**
     * Save an image.Saves the image to the photo library.
     * Parameters¶
     * image
     * Image
     * The image to save.
     */
    static save(image: Image)
  } /** ---------Point --------
  Structure representing a point.
The structure encapsulates a coordinate in a two-dimensional coordinate system.

---------Point --------
*/
  class Point {
    /**
     * X value.
     */
    x: number

    /**
     * Y value.
     */
    y: number

    /**
     * Constructs a new point.Parameters¶
     * x
     * number
     * X value.
     * y
     * number
     * Y value.
     */
    constructor(x: number, y: number)
  } /** ---------QuickLook --------
  Presents an item.
Use the quick look to present a file, an image or text string. The quick look will try to choose the best suited presentation of the item.

---------QuickLook --------
*/
  class QuickLook {
    /**
     * Presents the item.Chooses the best suited presentation of the item and performs the presentation if possible.
     * Parameters¶
     * item
     * any
     * Item to be present.
     * fullscreen
     * bool
     * Optional. Set to true to present the item in fullscreen. This only has an effect when used within the app. Defaults to false.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the quick look is dismissed.
     */
    static present(item: any, fullscreen: boolean): Promise<void>
  } /** ---------Rect --------
  Structure representing a rectangle.
The structure has a width, height and a coordinate in a two-dimensional coordinate system.

---------Rect --------
*/
  class Rect {
    /**
     * Minimum X value.
     * Read-only.
     * The smallest x-coordinate in the rectangle.
     */
    minX: number

    /**
     * Minimum Y value.
     * Read-only.
     * The smallest y-coordinate in the rectangle.
     */
    minY: number

    /**
     * Maximum X value.
     * Read-only.
     * The greatest x-coordinate in the rectangle.
     */
    maxX: number

    /**
     * Maximum Y value.
     * Read-only.
     * The greatest y-coordinate in the rectangle.
     */
    maxY: number

    /**
     * X value.
     * The x-coordinate of the rectangle.
     */
    x: number

    /**
     * Y value.
     * The y-coordinate of the rectangle.
     */
    y: number

    /**
     * Width of rectangle.
     * The width of the rectangle.
     */
    width: number

    /**
     * Height of rectangle.
     * The height of the rectangle.
     */
    height: number

    /**
     * Point that specifies the rectangles origin.
     * The x- and y-coordinate that specifies the rectangles origin as a Point structure.
     */
    origin: Point

    /**
     * Size of the rectangle.
     * The width and height of the rectangle as a Size structure.
     */
    size: Size

    /**
     * Constructs a rectangle.Constructs a new rectangle placed in a two-dimensional coordinate system.
     * Parameters¶
     * x
     * number
     * X coordinate.
     * y
     * number
     * Y coordinate.
     * width
     * number
     * Width of rectangle.
     * height
     * number
     * Height of rectangle.
     */
    constructor(x: number, y: number, width: number, height: number)
  } /** ---------RecurrenceRule --------
  Recurrence rule used with reminders and calendar events.
A recurrence rule specifies how often a reminder or a calendar event should repeat.

---------RecurrenceRule --------
*/
  class RecurrenceRule {
    /**
     * Constructs a daily recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every day and a value of 3 specifies that the rule should repeat every third day.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static daily(interval: number): RecurrenceRule

    /**
     * Constructs a daily recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every day and a value of 3 specifies that the rule should repeat every third day.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static dailyEndDate(interval: number, endDate: Date): RecurrenceRule

    /**
     * Constructs a daily recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every day and a value of 3 specifies that the rule should repeat every third day.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static dailyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

    /**
     * Constructs a weekly recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static weekly(interval: number): RecurrenceRule

    /**
     * Constructs a weekly recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static weeklyEndDate(interval: number, endDate: Date): RecurrenceRule

    /**
     * Constructs a weekly recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static weeklyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

    /**
     * Constructs a monthly recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static monthly(interval: number): RecurrenceRule

    /**
     * Constructs a monthly recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static monthlyEndDate(interval: number, endDate: Date): RecurrenceRule

    /**
     * Constructs a monthly recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static monthlyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

    /**
     * Constructs a yearly recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static yearly(interval: number): RecurrenceRule

    /**
     * Constructs a yearly recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static yearlyEndDate(interval: number, endDate: Date): RecurrenceRule

    /**
     * Constructs a yearly recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static yearlyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

    /**
     * Constructs a complex weekly recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexWeekly(interval: number, daysOfTheWeek: number, setPositions: [number][]): RecurrenceRule

    /**
     * Constructs a complex weekly recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexWeeklyEndDate(
      interval: number,
      daysOfTheWeek: number,
      setPositions: [number][],
      endDate: Date,
    ): RecurrenceRule

    /**
     * Constructs a complex weekly recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexWeeklyOccurrenceCount(
      interval: number,
      daysOfTheWeek: number,
      setPositions: [number][],
      occurrenceCount: number,
    ): RecurrenceRule

    /**
     * Constructs a complex monthly recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * daysOfTheMonth
     * [number]
     * Days of the month to repeat the rule. Values range from 1 to 31 and from -1 to -31.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexMonthly(
      interval: number,
      daysOfTheWeek: number,
      daysOfTheMonth: [number],
      setPositions: [number][],
    ): RecurrenceRule

    /**
     * Constructs a complex monthly recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * daysOfTheMonth
     * [number]
     * Days of the month to repeat the rule. Values range from 1 to 31 and from -1 to -31.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexMonthlyEndDate(
      interval: number,
      daysOfTheWeek: number,
      daysOfTheMonth: [number],
      setPositions: [number][],
      endDate: Date,
    ): RecurrenceRule

    /**
     * Constructs a complex monthly recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * daysOfTheMonth
     * [number]
     * Days of the month to repeat the rule. Values range from 1 to 31 and from -1 to -31.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexMonthlyOccurrenceCount(
      interval: number,
      daysOfTheWeek: number,
      daysOfTheMonth: [number],
      setPositions: [number][],
      occurrenceCount: number,
    ): RecurrenceRule

    /**
     * Constructs a complex yearly recurrence rule.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * monthsOfTheYear
     * [number]
     * The months of the year to repeat the rule. Values range from 1 to 12.
     * weeksOfTheYear
     * [number]
     * The weeks of the year to repeat the rule. Values range from 1 to 53 and -1 to -53.
     * daysOfTheYear
     * [number]
     * The days of the year to repeat the rule. Values range from 1 to 366 and -1 to -366.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexYearly(
      interval: number,
      daysOfTheWeek: number,
      monthsOfTheYear: [number],
      weeksOfTheYear: [number],
      daysOfTheYear: [number],
      setPositions: [number][],
    ): RecurrenceRule

    /**
     * Constructs a complex yearly recurrence rule with an end date.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third week.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * monthsOfTheYear
     * [number]
     * The months of the year to repeat the rule. Values range from 1 to 12.
     * weeksOfTheYear
     * [number]
     * The weeks of the year to repeat the rule. Values range from 1 to 53 and -1 to -53.
     * daysOfTheYear
     * [number]
     * The days of the year to repeat the rule. Values range from 1 to 366 and -1 to -366.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * endDate
     * Date
     * Date at which the recurrence rule should end.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexYearlyEndDate(
      interval: number,
      daysOfTheWeek: number,
      monthsOfTheYear: [number],
      weeksOfTheYear: [number],
      daysOfTheYear: [number],
      setPositions: [number][],
      endDate: Date,
    ): RecurrenceRule

    /**
     * Constructs a complex yearly recurrence rule with an occurrence count.The interval should have a value greater than 0 and specifies how often the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
     * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
     * Parameters¶
     * interval
     * number
     * Interval at which to repeat the rule.
     * daysOfTheWeek
     * [number]
     * Days of the week to repeat the rule. Values range from 1 to 7, with Sunday being 1.
     * monthsOfTheYear
     * [number]
     * The months of the year to repeat the rule. Values range from 1 to 12.
     * weeksOfTheYear
     * [number]
     * The weeks of the year to repeat the rule. Values range from 1 to 53 and -1 to -53.
     * daysOfTheYear
     * [number]
     * The days of the year to repeat the rule. Values range from 1 to 366 and -1 to -366.
     * setPositions
     * [number]
     * Filters which recurrences to include in the rule's frequency.
     * occurrenceCount
     * number
     * Number of times the rule should repeat before it ends.
     * Return value¶
     * RecurrenceRule
     * Constructed recurrence rule.
     */
    static complexYearlyOccurrenceCount(
      interval: number,
      daysOfTheWeek: number,
      monthsOfTheYear: [number],
      weeksOfTheYear: [number],
      daysOfTheYear: [number],
      setPositions: [number][],
      occurrenceCount: number,
    ): RecurrenceRule
  } /** ---------RelativeDateTimeFormatter --------
  Creates a textual representation of the amount of time between two dates.
The relative date formatter takes two dates as input and creates a textual representation that communicates the relative time between the two dates, e.g. "yesterday" and "in 1 week".

---------RelativeDateTimeFormatter --------
*/
  class RelativeDateTimeFormatter {
    /**
     * Locale to use when formatting.
     * The locale should be specified using a string identifier, e.g. "en", "it" or "da". When no locale is set, the formatter will use the current locale of the device.
     */
    locale: string

    /**
     * Constructs a relative date and time formatter.
     * The formatter creates a textual representation of the time between two points in time.
     */
    constructor()

    /**
     * Creates a localized string communicating the amount of time between two dates.Creates a localized textual representation of the amount of time between to dates. If the two dates are the same, the function will return "now". If the reference date is yesterday, the function will return "yesterday". Other examples include "in 10 seconds", "2 hours ago", "last week" and "next year".
     * Parameters¶
     * date
     * Date
     * The date to create a relative date and time for.
     * referenceDate
     * Date
     * The reference date that date is relative to.
     * Return value¶
     * string
     * A textual representation of the amount of time between the two dates.
     */
    string(date: Date, referenceDate: Date): string

    /**
     * Prefers named dates and times.
     * When using the named style, the formatter tries to find a suitable textual representation over a numeric value for the relative time, e.g. "now" instead of "in 0 seconds" and "yesterday" instead of "1 day ago".
     * When no named representation is found the formatter will fallback to using the numeric style.
     */
    useNamedDateTimeStyle()

    /**
     * Prefers numeric dates and times.
     * When using the numeric style, the formatter will always prefer numeric representations over named representations. E.g. it will return "in 0 seconds" instead of "now" and "1 day ago" instead of "yesteday".
     */
    useNumericDateTimeStyle()
  } /** ---------Reminder --------
  Manages reminders in calendars.
Used for creating, fetching and removing reminders from your calendars.

---------Reminder --------
*/
  class Reminder {
    /**
     * Identifier of reminder.
     * Read-only.
     */
    identifier: string

    /**
     * Title of reminder.
     */
    title: string

    /**
     * Notes associated with reminder.
     */
    notes: string

    /**
     * Whether the reminder is completed
     */
    isCompleted: boolean

    /**
     * Priority of reminder.
     * Specifies the prirority of the reminder with 0 representing an undefined priority, 1 the highest priority, and 9 the lowest priority.
     */
    priority: number

    /**
     * Due date of reminder.
     */
    dueDate: Date

    /**
     * Whether the due date includes a time.
     * When this is true, assignments to the dueDate property will include a time, when this is false, the time component of the date will be ignored. Defaults to true.
     */
    dueDateIncludesTime: boolean

    /**
     * Completion date of reminder.
     * Read-only.
     */
    completionDate: Date

    /**
     * Creation date of reminder.
     * Read-only.
     */
    creationDate: Date

    /**
     * Calendar the reminder is stored in.
     */
    calendar: Calendar

    /**
     * Constructs a reminder.
     * In order to add the reminder to your calendar, you must call the save() function.
     */
    constructor()

    /**
     * Adds a recurrence rule.Recurrence rules specify when the reminder should be repeated. See the documentation of RecurrenceRule for more information on creating rules.
     * Parameters¶
     * recurrenceRule
     * RecurrenceRule
     * Recurrence rule to add to the reminder.
     */
    addRecurrenceRule(recurrenceRule: RecurrenceRule)

    /**
     * Removes all recurrence rules.
     */
    removeAllRecurrenceRules()

    /**
     * Saves reminder.
     * Saves changes to a reminder, inserting it into the calendar if it is newly created.
     */
    save()

    /**
     * Removes reminder from calendar.
     */
    remove()

    /**
     * Fetches the schedule of reminders.The fetched result contains reminders that are due today and reminders that are overdue. This is similar to the reminders shown in the Reminders apps "Scheduled" list. For performance reasons iOS limits fetched results to events within a four year timespan.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static scheduled(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders.For performance reasons iOS limits fetched results to events within a four year timespan.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static all(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all completed reminders.For performance reasons iOS limits fetched results to events within a four year timespan.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allCompleted(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all incomplete reminders.For performance reasons iOS limits fetched results to events within a four year timespan.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allIncomplete(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders due today.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueToday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders due today.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueToday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders due today.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueToday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders due tomorrow.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueTomorrow(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders due tomorrow.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueTomorrow(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders due tomorrow.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueTomorrow(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders due yesterday.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueYesterday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders due yesterday.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueYesterday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders due yesterday.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueYesterday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders due this week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueThisWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders due this week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueThisWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders due this week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueThisWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders due next week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueNextWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders due next week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueNextWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders due next week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueNextWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches all reminders due last week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueLastWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders due last week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueLastWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders due last week.Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueLastWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches reminders completed today.Note that this does not take the due date into account. This will return all reminders that you have completed today.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedToday(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches reminders completed this week.Note that this does not take the due date into account. This will return all reminders that you have completed this week.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedThisWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches reminders completed last week.Note that this does not take the due date into account. This will return all reminders that you have completed last week.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedLastWeek(calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches due reminders.Fetches reminders that are due within the time interval constituted by the start and end dates.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static allDueBetween(startDate: Date, endDate: Date, calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders.Fetches reminders that are completed and that were due within the time interval constituted by the start and end dates.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedDueBetween(startDate: Date, endDate: Date, calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches incomplete reminders.Fetches reminders that are incomplete and that were due within the time interval constituted by the start and end dates.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static incompleteDueBetween(startDate: Date, endDate: Date, calendars: Calendar): Promise<[Reminder][]>

    /**
     * Fetches completed reminders.Fetches reminders that were completed within the time interval constituted by the start and end dates.
     * Parameters¶
     * calendars
     * [Calendar]
     * Calendars to fetch reminders for. Defaults to all calendars.
     * Return value¶
     * Promise<[Reminder]>
     * Promise that provides the reminders when fulfilled.
     */
    static completedBetween(startDate: Date, endDate: Date, calendars: Calendar): Promise<[Reminder][]>
  } /** ---------Request --------
  Performs HTTP requests.
Performs a URL request and returns the response in an appropriate format.

---------Request --------
*/
  class Request {
    /**
     * URL to send request to.
     */
    url: string

    /**
     * HTTP method used for the request.
     * Specifies the HTTP method to use when sending the request. The default is to send the request using the GET HTTP method.
     */
    method: string

    /**
     * HTTP headers to send with the request.
     * Key value pairs where the key is the name of an HTTP header and the value will be sent as the value for the HTTP header.
     */
    headers: Record<string, string>

    /**
     * Body to send with the request.
     * The body will be send along the request. While this property can be any value, currently only strings and Data is supported.
     * Be aware that this property is ignored if you convert the request to a multipart request using addParameterToMultipart, addFileToMultipart or addFileDataToMultipart.
     */
    body: any

    /**
     * Response of the request.
     * Read-only.
     * The response is not populated until the request has been completed. The response is an object that looks like the following example.
     * {
     *   "url": "https://example.com/",
     *   "statusCode": 200
     *   "mimeType": "application/json",
     *   "textEncodingName": "utf-8",
     *   "headers": {
     *     "Content-Type": "application/json;charset=utf-8",
     *     "Content-Length": "17671"
     *   },
     *   "cookies": [{
     *     "path": "/",
     *     "httpOnly": true,
     *     "domain": "www.example.com",
     *     "sessionOnly": true,
     *     "name": "JSESSIONID",
     *     "value": "7616271F4878CFD05182D20C45F4CEB3"
     *   }]
     * }
     *
     */
    response: Record<string, any>

    /**
     * Allow the request even if it is deemed insecure.
     * By default Scriptable will attempt to reject requests that are deemed insecure.
     * As an example, Scriptable will reject communicating with a server that has an invalid certificate. Such servers might be malicious and may put confidentional information at risk. By enabling this setting, those requests will be allowed.
     * Enable this setting at your own risk.
     */
    allowInsecureRequest: boolean

    /**
     * Function called upon redirect.
     * The function determines how redirects should be handled. By default redirects are allowed. When invoked the function is supplied with the request that we're about to redirect to. The function can return the request to continue redirecting or it can return another request to redirect to. Returning null will stop the redirect. Note that onRedirect will only be invoked on the initial request. Consecutive redirects should be handled on the initial request.
     */
    onRedirect(req: Request): Request

    /**
     * Constructs a request.Constructs a new request that will be sent to the provided URL. The request is not sent until an appropriate load method is called, e.g. loadImage for downloading and interpreting the response as an image.
     * Parameters¶
     * url
     * string
     * URL to send request to.
     */
    constructor(url: string)

    /**
     * Sends request.Call to send the configured request to the specified URL. The raw response is provided when the returned promise is fulfilled.
     * Return value¶
     * Promise
     * Promise that provides the response as data when fulfilled.
     */
    load(): Promise<Data>

    /**
     * Sends request and parses response as a string.Call to send the configured request to the specified URL. The response is parsed to a string and provided when the returned promise is fulfilled.
     * Return value¶
     * Promise
     * Promise that provides the response as a string when fulfilled.
     */
    loadString(): Promise<string>

    /**
     * Sends request and parses response as JSON.Call to send the configured request to the specified URL. The response is expected to be a valid JSON string and is parsed into an object.
     * Return value¶
     * Promise
     * Promise that provides the response as an object when fulfilled.
     */
    loadJSON(): Promise<any>

    /**
     * Sends request and parses response as an image.Call to send the configured request to the specified URL. The response is expected to be an image.
     * Return value¶
     * Promise
     * Promise that provides the response as an image.
     */
    loadImage(): Promise<Image>

    /**
     * Adds a parameter to a multipart request.Converts the request to a multipart request and adds a parameter with the specified name and value. Be aware that the body property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
     * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
     * Parameters¶
     * name
     * string
     * Name of the parameter.
     * value
     * string
     * Value of the parameter.
     */
    addParameterToMultipart(name: string, value: string)

    /**
     * Adds a file to a multipart request.Converts the request to a multipart request and adds the file to the request. Be aware that the body property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
     * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
     * Parameters¶
     * data
     * Data
     * File data to add.
     * mimeType
     * string
     * MIME type of the file to add.
     * name
     * string
     * Name of the parameter which holds the file.
     * filename
     * string
     * Name of the file.
     */
    addFileDataToMultipart(data: Data, mimeType: string, name: string, filename: string)

    /**
     * Adds a file to a multipart request.Converts the request to a multipart request and adds the file to the request. The function will automatically determine the MIME type of the file as well as the filename. Be aware that the body property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
     * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
     * Parameters¶
     * filePath
     * string
     * Path of the file to add.
     * name
     * string
     * Name of the parameter which holds the file.
     * filename
     * string
     * Optional name of the uploaded file.
     */
    addFileToMultipart(filePath: string, name: string, filename: string)

    /**
     * Adds an image to a multipart request.Converts the request to a multipart request and adds the image to the request. The function will automatically determine the MIME type of the file Be aware that the body property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
     * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
     * Parameters¶
     * image
     * Image
     * Image to add.
     * name
     * string
     * Name of the parameter which holds the file.
     * filename
     * string
     * Optional name of the uploaded file.
     */
    addImageToMultipart(image: Image, name: string, filename: string)
  } /** ---------Safari --------
  Presents a website.
Presents a website either in-app or by leaving the app an opening the Safari app.

---------Safari --------
*/
  class Safari {
    /**
     * Presents a website in-app.Presents a website without leaving the app.
     * Parameters¶
     * url
     * string
     * URL of website to present.
     * fullscreen
     * bool
     * Optional. Set to true to display the web view in fullsceen. This only has an effect when used within the app. Defaults to true.
     */
    static openInApp(url: string, fullscreen: boolean): Promise<void>

    /**
     * Presents a website.Presents a website in the Safari app, thus leaving the current app.
     * Parameters¶
     * url
     * string
     * URL of website to present.
     */
    static open(url: string)
  } /** ---------Script --------
  Access information about the script.
Allows for accessing information about the script that is currently being run and controlling selected parts of the script execution.

---------Script --------
*/
  class Script {
    /**
     * Name of the script.
     */
    static name(): string

    /**
     * Informs the system about script completion.
     * Call this function to inform the system that the script has completed running.
     * When a script is run inside Siri and the Shortcuts app, Scriptable use heuristics to determine if the script has completed. If you find that a script takes too long to complete, you can manually call the complete function to stop the execution. Note that this should be done as the very last action the script performs.
     * When the script is run from a share sheet, the complete function will complete execution and dismiss the presented view.
     */
    static complete()

    /**
     * Sets output when running the script as a shortcut action.Use this function to pass values to other actions in the Shortcuts app. The output can be a text, a number, a boolean, a dictionary or a file path pointing to a file stored in iCloud.
     * You can also use JavaScript's return keyword to output a value to a shortcut.
     * Parameters¶
     * value
     * any
     * Value to provide as output.
     */
    static setShortcutOutput(value: any)

    /**
     * Sets the widget to be displayed.Parameters¶
     * widget
     * any
     * Widget to display.
     */
    static setWidget(widget: any)
  } /** ---------SFSymbol --------
  Representation of a SF symbol.
SF symbols are Apple's configurable icons that are designed to look great with the San Francisco font.
Symbols are referenced by their name. You can find the symbol names in Apple's SF Symbols app for macOS. You can also browse symbol names in the SF Symbols Browser and San Fransymbols apps for iOS.

---------SFSymbol --------
*/
  class SFSymbol {
    /**
     * Convert the symbol to an image.
     * Read-only.
     */
    image: Image

    /**
     * Constructs a SF symbol.SF symbols are Apple's configurable icons that are designed to look great with the San Francisco font.
     * Symbols are referenced by their name. You can find the symbol names in Apple's SF Symbols app for macOS. You can also browse symbol names in the SF Symbols Browser and San Fransymbols apps for iOS.
     * Parameters¶
     * symbolName
     * string
     * Name of the symbol.
     * Return value¶
     * SFSymbol
     * Constructed SF symbol or null if no symbol with the name exists.
     */
    static named(symbolName: string): SFSymbol

    /**
     * Configures the symbol with the specified font information.
     */
    applyFont(font: Font)

    /**
     * Configures the symbol to use an ultra light weight.
     */
    applyUltraLightWeight()

    /**
     * Configures the symbol to use an thin weight.
     */
    applyThinWeight()

    /**
     * Configures the symbol to use an light weight.
     */
    applyLightWeight()

    /**
     * Configures the symbol to use an regular weight.
     */
    applyRegularWeight()

    /**
     * Configures the symbol to use an medium weight.
     */
    applyMediumWeight()

    /**
     * Configures the symbol to use an semibold weight.
     */
    applySemiboldWeight()

    /**
     * Configures the symbol to use an bold weight.
     */
    applyBoldWeight()

    /**
     * Configures the symbol to use an heavy weight.
     */
    applyHeavyWeight()

    /**
     * Configures the symbol to use an black weight.
     */
    applyBlackWeight()
  } /** ---------ShareSheet --------
  Offers standard activities to perform on items.
The activity picker presents activities that can be performed on a set of items. For example sending an item via an email or SMS, saving an item to disk or opening an item in a third party app. Available activites vary depending on the provided items.

---------ShareSheet --------
*/
  class ShareSheet {
    /**
     * Presents the activity picker.Presents a share sheet with an array of items to share. The activities included in the presented sheet will vary based on the type of item.
     * Parameters¶
     * activityItems
     * [any]
     * Items to perform activity on.
     * Return value¶
     * Promise<{string: any}>
     * Promise carrying a value that tells which activity that was performed, if any. The promise is fulfilled when the sheet is dismissed.
     */
    static present(activityItems: any[]): Promise<Record<string, any>>
  } /** ---------Size --------
  Structure representing a size.
The structure has a width and a height to specify a two-dimensional size.

---------Size --------
*/
  class Size {
    /**
     * Width value.
     */
    width: number

    /**
     * Height value.
     */
    height: number

    /**
     * Constructs a new size.Parameters¶
     * width
     * number
     * Width value.
     * height
     * number
     * Height value.
     */
    constructor(width: number, height: number)
  } /** ---------Speech --------
  Speaks a text.
If used in a script triggered by a Siri Shortcut, Siri will speak the text.

---------Speech --------
*/
  class Speech {
    /**
     * Speaks a text.
     * Parameters¶
     * text
     * string
     * Text to speak.
     */
    static speak(text: string)
  } /** ---------Timer --------
  A timer that fires after a time interval has elapsed.
The timer fires after a specified time interval has elapsed. The timer can be repeating in which case it will fire multiple times.

---------Timer --------
*/
  class Timer {
    /**
     * The frequency at which the timer fires, in milliseconds.
     * Be aware that the time interval is specified in setting. Defaults to 0, causing the timer to fire instantly.
     */
    timeInterval: number

    /**
     * Whether the timer should repeat.
     * A repeating timer will keep firing until it is invalidated. In contrast to non-repeating timers, repeating timers are not automatically invalidated. Defaults to false.
     */
    repeats: boolean

    /**
     * Constructs a timer.
     * Constructs a timer that fires after a specified time interval.
     */
    constructor()

    /**
     * Schedules the timer.Schedules the timer using its configuration. The supplied function is called when the timer fires. To stop the timer from firing, call the invalidate() function.
     * Parameters¶
     * callback
     * fn()
     * The callback to be called when the timer fires.
     */
    schedule(callback: () => void)

    /**
     * Stops the timer from firing.
     * Stops the timer from firing ever again. Non-repeating timers are automatically invalidated after they have fired once. Repeating timers must be manually invalidated.
     */
    invalidate()

    /**
     * Schedules a timer.This is a convenience function for creating a new timer. The created timer is instantly scheduled and will fire after the specified time interval.
     * Parameters¶
     * timeInterval
     * number
     * The time interval to fire the timer at.
     * repeats
     * bool
     * Whether the timer should repeat or not.
     * callback
     * fn()
     * The callback to be called when the timer fires.
     * Return value¶
     * Timer
     * The constructed timer.
     */
    static schedule(timeInterval: number, repeats: boolean, callback: () => void): Timer
  } /** ---------UITable --------
  Renders a table.
Tables present data in a structured manner. A table contains rows which in turn contains cells.

---------UITable --------
*/
  class UITable {
    /**
     * Whether to show separators.
     * Whether to show separators between rows. Defaults to false.
     */
    showSeparators: boolean

    /**
     * Constructs a table.
     * Use a table to present data in a structured manner.
     */
    constructor()

    /**
     * Adds a row.Adds a row to the table. Rows are shown vertically in the table view, i.e. from the top and down. Rows are rendered in the order they are added.
     * Parameters¶
     * row
     * UITableRow
     * Row to add.
     */
    addRow(row: UITableRow)

    /**
     * Removes a row.Removes a row from the table.
     * Parameters¶
     * row
     * UITableRow
     * Row to remove.
     */
    removeRow(row: UITableRow)

    /**
     * Removes all rows.
     * Removes all rows from the table. If the table is presented, you must call the reload function in order for the changes to be reflected visually.
     */
    removeAllRows()

    /**
     * Reloads the table.
     * If you add or remove rows while a table view is presented, you must reload the table in order for the changes to take effect.
     */
    reload()

    /**
     * Presents the table.Parameters¶
     * fullscreen
     * bool
     * Optional. Set to true to present the web view in fullscreen. This only has an effect when used within the app. Defaults to false.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the table is dismissed.
     */
    present(fullscreen: boolean): Promise<void>
  } /** ---------UITableCell --------
  Cell in a UITableRow.
Cells are shown horizontally in a UITableRow which in turn is shown vertically in a UITable. Cells have content, e.g. a text or an image.

---------UITableCell --------
*/
  class UITableCell {
    /**
     * Relative width of the cell.
     * A width weight specifies the relative width of the cell. When computing the absolute width of the cell, all width weights are taken into account. Consider the following example.
     * Cell A has a width weight of 50. Cell B has a width weight of 100. Cell C has a width wegiht of 150.
     * Assume that the row has an absolute width of 100. The width will be distributed among cells A, B and C. B will be double as wide as A but C will be fifty percent wider than B and three times as wide as A.
     */
    widthWeight: number

    /**
     * Whether to dismiss the table when the button is tapped.
     * Defaults to false.
     */
    dismissOnTap: boolean

    /**
     * Color of the title.
     * This only has an effect on cells with a title. By default the color is null, in which case an appropriate color is automatically chosen based on the theme of the app and the context the script is running in.
     */
    titleColor: Color

    /**
     * Color of the subtitle.
     * This only has an effect on cells with a subtitle. By default the color is null, in which case an appropriate color is automatically chosen based on the theme of the app and the context the script is running in.
     */
    subtitleColor: Color

    /**
     * Font of the title.
     */
    titleFont: Font

    /**
     * Font of the subtitle.
     */
    subtitleFont: Font

    /**
     * Called when the button is tapped.
     * Buttons cannot be tapped when the table is presented in Siri.
     */
    onTap()

    /**
     * Constructs a text cell.Constructs a new cell containing text.
     * Parameters¶
     * title
     * string
     * Optional title to show in the cell.
     * subtitle
     * string
     * Optional subtitle shown below the title.
     * Return value¶
     * UITableCell
     * Constructed cell.
     */
    static text(title: string, subtitle: string): UITableCell

    /**
     * Constructs an image cell.Constructs a new cell containing an image.
     * Parameters¶
     * image
     * Image
     * Image to show in the cell.
     * Return value¶
     * UITableCell
     * Constructed cell.
     */
    static image(image: Image): UITableCell

    /**
     * Constructs an image cell.Constructs a new cell that loads the image at the specified URL.
     * Parameters¶
     * url
     * string
     * URL to image.
     * Return value¶
     * UITableCell
     * Constructed cell.
     */
    static imageAtURL(url: string): UITableCell

    /**
     * Constructs a button cell.Constructs a new cell that contains a button. Set the onTap property to specify an action to performed when the button is tapped.
     * Parameters¶
     * title
     * string
     * Title of the button.
     * Return value¶
     * UITableCell
     * Constructed cell.
     */
    static button(title: string): UITableCell

    /**
     * Left aligns content.
     * Specifies that content in the cell should be left aligned.
     */
    leftAligned()

    /**
     * Center aligns content.
     * Specifies that content in the cell should be center aligned.
     */
    centerAligned()

    /**
     * Right aligns content.
     * Specifies that content in the cell should be right aligned.
     */
    rightAligned()
  } /** ---------UITableRow --------
  Row in a UITable.
Rows can be added to an instance of UITable. A row is shown vertically in a UITable in the order they are added to the table. Rows contain cells which are shown horizontally in the order they are added to the row.

---------UITableRow --------
*/
  class UITableRow {
    /**
     * Spacing between cells.
     * Specifies the horizontal spacing between cells in the row.
     */
    cellSpacing: number

    /**
     * Height of the row.
     * The height of the row defaults to 44.
     */
    height: number

    /**
     * Whether the cell is a header.
     * Headers are highlighted cells that helps users understand context. Defaults to false.
     */
    isHeader: boolean

    /**
     * Whether to dismiss the table when the row is selected.
     * This property will only have an effect if the row is selectable, i.e. onSelect has a value. Otherwise it is ignored.
     * Defaults to true.
     */
    dismissOnSelect: boolean

    /**
     * Background color.
     */
    backgroundColor: Color

    /**
     * Called when the row is selected.
     * Called when the row is selected when the table is presented. If this has no value, the row cannot be selected. Defaults to null.
     * Rows cannot be tapped when the tables is presented in Siri.
     */
    onSelect(selected: number)

    /**
     * Constructs a row.
     * Rows are shown vertically in a UITable. A row contains cells which are displayed horizontally.
     */
    constructor()

    /**
     * Adds a cell.Adds a cell to the row. Note that cells are shown in the order they are added to the row.
     * Parameters¶
     * cell
     * UITableCell
     * Cell to add to the row.
     */
    addCell(cell: UITableCell)

    /**
     * Adds a text cell.Constructs a new cell containing the specified string and adds it to the row.
     * Parameters¶
     * title
     * string
     * Optional title to show in the cell.
     * subtitle
     * string
     * Optional subtitle shown below the title in the cell.
     * Return value¶
     * UITableCell
     * Constructed cell.
     */
    addText(title: string, subtitle: string): UITableCell

    /**
     * Adds an image cell.Constructs a new cell containing the specified image and adds it to the row.
     * Parameters¶
     * image
     * Image
     * Image to show in the cell.
     * Return value¶
     * UITableCell
     * Cosntructed cell.
     */
    addImage(image: Image): UITableCell

    /**
     * Adds an image cell.Constructs a new cell that loads the image at the specified url and adds the cell to the row.
     * Parameters¶
     * url
     * string
     * URL to image.
     * Return value¶
     * UITableCell
     * Cosntructed cell.
     */
    addImageAtURL(url: string): UITableCell

    /**
     * Adds a button cell.Constructs a new cell that contains a button. Set the onTap property to specify an action to performed when the button is tapped.
     * Parameters¶
     * title
     * string
     * Title of the button.
     * Return value¶
     * UITableCell
     * Cosntructed cell.
     */
    addButton(title: string): UITableCell
  } /** ---------URLScheme --------
  Manages URL schemes for Scriptable.
Use URL schemes to launch the app and perform an action, such as running a script. The app conforms to the scriptable:// URL scheme. The following actions can be performed using the URL scheme.
Adding a script To add a new script, you should use the following URL scheme:
scriptable:///add
Opening a script To open an existing script, you should use the following URL scheme:
scriptable:///open?scriptName=Example
The scriptName query parameter is the name of the script to open. scriptName must be URL encoded. You may optionally add the query parameter openSettings with a value of true to automatically open the script settings.
Running a script To run an existing script, you should use the following URL scheme:
scriptable:///run?scriptName=Example
The scriptName query parameter is the name of the script to run. scriptName must be URL encoded.
If you set openEditor to true, the script will run with the editor shown opposed to running directly from the list of scripts. Opening the editor to run the script is beneficial in cases where you need to view messages logged to the console.
In addition to the scriptable:// scheme, you can also perform the above actions using the universal link open.scriptable.app, e.g. https://open.scriptable.app/run?scriptName=Example

---------URLScheme --------
*/
  class URLScheme {
    /**
     * Gets all parameters from invocation of URL scheme.
     * Deprecated in version 1.3. Use args.queryParameters instead.Gets all the query parameters that were passed in the URL when running this script by invoking its URL scheme.
     * Return value¶
     * {string: string}
     * All query parameters.
     */
    static allParameters(): Record<string, string>

    /**
     * Gets a parameters from invocation of URL scheme.
     * Deprecated in version 1.3. Use args.queryParameters instead.Gets the value of a query parameter that was passed in the URL when running this script by invoking its URL scheme.
     * Parameters¶
     * name
     * string
     * Name of the query parameter to get the value for.
     * Return value¶
     * string
     * Value of query parameter.
     */
    static parameter(name: string): string

    /**
     * URL for opening the script.Gets the URL for opening the current script. When making a request to the returned URL from another app, e.g. Safari, the script will be opened.
     * Return value¶
     * string
     * URL for opening script.
     */
    static forOpeningScript(): string

    /**
     * URL for opening script settings.Gets the URL for opening the settings of the current script. When making a request to the returned URL from another app, e.g. Safari, the settings of the current script will be opened.
     * Return value¶
     * string
     * URL for opening script settings.
     */
    static forOpeningScriptSettings(): string

    /**
     * URL for running script.Gets the URL for running the current script. When making a request to the returned URL from another app, e.g. Safari, the current script will run.
     * Get the query parameters using the args.queryParameters.
     * Return value¶
     * string
     * URL for opening script settings.
     */
    static forRunningScript(): string
  } /** ---------UUID --------
  Unique identifier.
A universally unique value that can be used to identify items.

---------UUID --------
*/
  class UUID {
    /**
     * Get string value.Used for getting the string value of a UUID.
     * Return value¶
     * string
     * String value.
     */
    static string(): string
  } /** ---------WebView --------
  Presents websites and evaluates JavaScript on websites.
Supports rendering HTML as well as loading a file and rendering it. A file can be of various types. It could for example be an HTML file or an image.
The web view also supports evaluating JavaScript on a website.

---------WebView --------
*/
  class WebView {
    /**
     * Function called upon load of a request.
     * When the web view performs a request to load a resource, the function can determine whether or not to allow the request. Disallowing request can speed up the time it takes to load the website.
     * By default all requests are allowed.
     */
    shouldAllowRequest(req: Request): boolean

    /**
     * Constructs web view.
     * Constructs a new web view. Use a web view to evaluate JavaScript on websites.
     */
    constructor()

    /**
     * Loads HTML and renders it.Parameters¶
     * html
     * string
     * HTML to load and render.
     * baseURL
     * string
     * Optional. Base URL used to resolve relative URLs in the HTML.
     * preferredSize
     * Size
     * Optional. Preferred size of the view. This size is not guaranteed to be respected and is only used when the script is run with Siri or in the Shortcuts app.
     * fullscreen
     * bool
     * Optional. Set to true to present the web view in fullscreen. This only has an effect when used within the app. Defaults to false.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view have been closed, the promise will complete.
     */
    static loadHTML(html: string, baseURL: string, preferredSize: Size, fullscreen: boolean): Promise<void>

    /**
     * Loads a file and renders it.Files can be of various types, including HTML files and images.
     * The supplied HTML file can reference files and nested directories in the same directory as the HTML file resides.
     * The optional preferredSize parameter is ignored unless the script is run in a Siri Shortcut.
     * If you are displaying large images in a memory constrained envrionment, for example in a Siri Shortcut, you should use the WebView bridge instead of the QuickLook bridge. The technical reason for this is that a Siri Shortcut and other app extension processes have very limited memory and loading a very large image will cause the app extension to be terminated. However, the web view will run in a different process meaning that it is not affected by the same memory constraints.
     * Parameters¶
     * fileURL
     * string
     * URL of the file to load and render.
     * preferredSize
     * Size
     * Optional. Preferred size of the view. This size is not guaranteed to be respected and is only used when the script is run with Siri or in the Shortcuts app.
     * fullscreen
     * bool
     * Optional. Set to true to present the web view in fullscreen. This only has an effect when used within the app. Defaults to false.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view have been closed, the promise will complete.
     */
    static loadFile(fileURL: string, preferredSize: Size, fullscreen: boolean): Promise<void>

    /**
     * Loads URL in web view and presents the web view.The optional preferredSize parameter is ignored unless the script is run in a Siri Shortcut.
     * Parameters¶
     * url
     * string
     * URL to load into the web view.
     * preferredSize
     * Size
     * Optional. Preferred size of the view. This size is not guaranteed to be respected and is only used when the script is run with Siri or in the Shortcuts app.
     * fullscreen
     * bool
     * Optional. Set to true to present the web view in fullscreen. This only has an effect when used within the app. Defaults to false.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view have been closed, the promise will complete.
     */
    static loadURL(url: string, preferredSize: Size, fullscreen: boolean): Promise<void>

    /**
     * Loads URL in web view.Loads the URL in the web view. The returned promise will complete once the web view has finished loading.
     * Parameters¶
     * url
     * string
     * URL to load into the web view.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view has finished loading, the promise will complete.
     */
    loadURL(url: string): Promise<void>

    /**
     * Loads request in web view.When loading a request into the web view, the HTTP method, body and headers of the request will be respected. The onRedirect function on the request will not be invoked.
     * Parameters¶
     * request
     * Request
     * Request to load into the web view.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view has finished loading, the promise will complete.
     */
    loadRequest(request: Request): Promise<void>

    /**
     * Loads HTML in web view.Loads the HTML into the web view. The returned promise will complete once the web view has finished loading.
     * Parameters¶
     * html
     * string
     * HTML to load into the web view.
     * baseURL
     * string
     * Optional. Base URL used to resolve relative URLs in the HTML.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view has finished loading, the promise will complete.
     */
    loadHTML(html: string, baseURL: string): Promise<void>

    /**
     * Loads file in the web view.Files can be of various types, including HTML files and images.
     * The supplied HTML file can reference files and nested directories in the same directory as the HTML file resides.
     * Parameters¶
     * fileURL
     * string
     * URL of the file to load and render.
     * Return value¶
     * Promise
     * Promise that carries no value. Once the web view has finished loading, the promise will complete.
     */
    loadFile(fileURL: string): Promise<void>

    /**
     * Evaluates JavaScript in the web view.Evaluates JavaScript in the current context of the web view. The returned promise carries the result of evaluating the JavaScript.
     * When passing false to the useCallback parameter, which is the default value, evaluation will terminate after evaluating the last line of the JavaScript. The value on the last line of the script will be carried by the promise returned by evaluateJavaScript.
     * When passing true to the useCallback parameter, evaluation will only complete after the globally available completion function is called. Any value passed to the function, will be carried by the promise returned by evaluateJavaScript.
     * The log is available from the evaluated JavaScript, i.e. messages passed to the globally available log and logError functions will be shown in the log.
     * Parameters¶
     * javaScript
     * string
     * JavaScript to evaluate in the web view.
     * useCallback
     * bool
     * Optional. If true the web view waits for the globally available completion function of the web view to be called before terminating. Defaults to false.
     * Return value¶
     * Promise
     * Promise that carries the result of evaluating the JavaScript.
     */
    evaluateJavaScript(javaScript: string, useCallback: boolean): Promise<any>

    /**
     * Reads and returns HTML from the loaded website.Return value¶
     * Promise
     * Promise that carries the HTML of the loaded website.
     */
    getHTML(): Promise<any>

    /**
     * Presents the web view.The web view is presented with the content that has been loaded into it.
     * Parameters¶
     * fullscreen
     * bool
     * Set to true to present the web view in fullscreen. Defaults to false.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the presented web view is dismissed. The promise carries no value.
     */
    present(fullscreen: boolean): Promise<void>

    /**
     * Waits for the web view to load.The returned promise will be fulfilled when the web view finishes loading. If the load fails, the promise will be fulfilled with an error. Use this with caution. If the web view is not loading a new page or is not about to load a new page, the returned promise will never be fulfilled. This limitation exists because Scriptable cannot determine if a web view is about to load a page in cases where evaluating JavaScript in the web view causes a new page to load.
     * Generally this should only be used when loading causing a new page to load from evaluateJavaScript. In other cases, e.g. when loading a URL using loadURL, the returned promise will be fulfilled when the page have been loaded.
     * Return value¶
     * Promise
     * Promise that is fulfilled when the web view has finished the active load.
     */
    waitForLoad(): Promise<any>
  } /** ---------WidgetDate --------
  Date element shown in a widget.
A date shown in a widget. Dates will update periodically when shown in a widget.
You do not create instances of this element directly. Instead you should call addDate() on an instance of a ListWidget.

---------WidgetDate --------
*/
  class WidgetDate {
    /**
     * Date to show in a widget.
     */
    date: Date

    /**
     * Color of the text.
     */
    textColor: Color

    /**
     * Font and text size of the text.
     */
    font: Font

    /**
     * Opacity of the text.
     * Opacity of the text. This must be a value between 0 and 1. Defaults to 1.
     */
    textOpacity: number

    /**
     * Maximum number of lines.
     * Maximum number of lines to display. The limit is disabled when the value is 0 or less. Defaults to 0.
     */
    lineLimit: number

    /**
     * Minimum amount the text scales down to.
     * Sets the minimum amount that text scales down to fit in the available space. For example, a text with a minimum scale factor of 0.5 allows the widget to draw the text in a font size half the size of the actual font. The scale factor should be a fraction between 0 and 1, both inclusive. Defaults to 1.
     */
    minimumScaleFactor: number

    /**
     * Color of the shadow.
     * Sets the color of the shadow cast by the text. The shadowRadius property must have a value greater than zero for this property to have an effect. Defaults to black.
     */
    shadowColor: Color

    /**
     * Size of the shadow.
     * Sets the size of the shadow cast by the text. Defaults to 0.
     */
    shadowRadius: number

    /**
     * Offset of the shadow.
     * Sets the offset of the shadow cast by the text. The shadowRadius property must have a value greater than zero for this property to have an effect. Defaults to (0, 0).
     */
    shadowOffset: Point

    /**
     * URL to open.
     * The URL will be opened when the text is tapped. This is only supported in medium and large widgets. Small widgets can only have a single tap target, which is specified by the url on the widget.
     */
    url: string

    /**
     * Left aligns the text.
     * Specifies that text should be left aligned. This is the default.
     * This does not affect texts placed in stacks. Use spacers instead when aligning text in stacks. To align the text to left right in a horizontal stack, you should place a spacer after the text.
     */
    leftAlignText()

    /**
     * Center aligns the text.
     * Specifies that text should be center aligned.
     * This does not affect texts placed in stacks. Use spacers instead when aligning text in stacks. To align the text in the center of a horizontal stack, you should place a spacer both before and after the text.
     */
    centerAlignText()

    /**
     * Right aligns the text.
     * Specifies that text should be right aligned.
     * This does not affect texts placed in stacks. Use spacers instead when aligning text in stacks. To align the text to the right in a horizontal stack, you should place a spacer before the text.
     */
    rightAlignText()

    /**
     * Display time component of the date.
     * Example output: 11:23PM
     */
    applyTimeStyle()

    /**
     * Display entire date.
     * Example output: June 3, 2019
     * This is the default.
     */
    applyDateStyle()

    /**
     * Display date as relative to now.
     * Example output: 2 hours, 23 minutes 1 year, 1 month
     */
    applyRelativeStyle()

    /**
     * Display date as offset from now.
     * Example output: +2 hours -3 months
     */
    applyOffsetStyle()

    /**
     * Display date as timer counting from now.
     * Example output: 2:32 36:59:01
     */
    applyTimerStyle()
  } /** ---------WidgetImage --------
  Image element shown in widget.
An image shown in a widget. You do not create instances of this element directly. Instead you should call addImage() on an instance of a ListWidget.

---------WidgetImage --------
*/
  class WidgetImage {
    /**
     * Image to show in widget.
     */
    image: Image

    /**
     * Whether the image is resizable.
     * When set to true, the image can be resized. Defaults to true.
     */
    resizable: boolean

    /**
     * Size of the image in the widget.
     * Size of the image. When set to null, the image will be shwon at its full size. Defaults to null.
     */
    imageSize: Size

    /**
     * Opacity when shown in widget.
     * Opacity of the image. This must be a value between 0 and 1. Defaults to 1.
     */
    imageOpacity: number

    /**
     * Radius of the corners.
     * Radius of the rounded corners. This property is ignored when containerRelativeShape is set to true. Defaults to 0.
     */
    cornerRadius: number

    /**
     * Border width.
     * Width of the border around the image. Defaults to 0.
     */
    borderWidth: number

    /**
     * Border color.
     * Color of the border around the image. Defaults to black.
     */
    borderColor: Color

    /**
     * Shape the image relative to its container.
     * When true the corners of the image will be rounded relative to the containing widget. The value of cornerRadius is ignored when this is true. Defaults to false.
     */
    containerRelativeShape: boolean

    /**
     * Tint color of the image.
     * Changes the color of the image. Set to null to show the original image. Defaults to null.
     */
    tintColor: Color

    /**
     * URL to open.
     * The URL will be opened when the text is tapped. This is only supported in medium and large widgets. Small widgets can only have a single tap target, which is specified by the url on the widget.
     */
    url: string

    /**
     * Left aligns the image.
     * Specifies that image should be left aligned. This is the default.
     */
    leftAlignImage()

    /**
     * Center aligns the image.
     * Specifies that image should be center aligned.
     */
    centerAlignImage()

    /**
     * Right aligns the image.
     * Specifies that image should be right aligned.
     */
    rightAlignImage()

    /**
     * Uses fitting content mode.
     * The image will fit the available space. This content mode is the default.
     */
    applyFittingContentMode()

    /**
     * Uses filling content mode.
     * The image will fill the available space.
     */
    applyFillingContentMode()
  } /** ---------WidgetSpacer --------
  Spacer element shown in widget.
Shows a spacer in the widget. A spacer with a null length has a flexible length.

---------WidgetSpacer --------
*/
  class WidgetSpacer {
    /**
     * Text to show in widget.
     */
    length: number
  } /** ---------WidgetStack --------
  Stack element shown in widget.
Shows a stack in the widget.

---------WidgetStack --------
*/
  class WidgetStack {
    /**
     * Background color of the widget.
     */
    backgroundColor: Color

    /**
     * Background image.
     */
    backgroundImage: Image

    /**
     * Background gradient.
     */
    backgroundGradient: LinearGradient

    /**
     * Spacing between elements.
     * Specifies the spacing between elements in the stack. You can also use the addSpacer() function on the widget to add spacing between elements. Defaults to 0.
     */
    spacing: number

    /**
     * Size of the stack.
     * Specifies the size of the stack when shown in a widget. When a dimension is set to zero or less, the widget will automatically decide a length for that dimension. Both dimensions default to 0.
     */
    size: Size

    /**
     * Radius of the corners.
     * Radius of the rounded corners. Defaults to 0.
     */
    cornerRadius: number

    /**
     * Border width.
     * Width of the border around the stack. Defaults to 0.
     */
    borderWidth: number

    /**
     * Border color.
     * Color of the border around the stack. Defaults to black.
     */
    borderColor: Color

    /**
     * URL to open.
     * The URL will be opened when the text is tapped. This is only supported in medium and large widgets. Small widgets can only have a single tap target, which is specified by the url on the widget.
     */
    url: string

    /**
     * Add text to the stack.Adds a text element to the stack. Use the properties on the returned element to style the text.
     * Return value¶
     * WidgetText
     * Text element.
     */
    addText(text: string): WidgetText

    /**
     * Add date to the widget.Adds a date element to the widget. Use the properties on the returned element to style the date.
     * Return value¶
     * WidgetDate
     * Date element.
     */
    addDate(date: Date): WidgetDate

    /**
     * Add image to the stack.Adds an image element to the stack. Use the properties on the returned element to style the image.
     * Return value¶
     * WidgetImage
     * Image element.
     */
    addImage(image: Image): WidgetImage

    /**
     * Add spacer.Adds a spacer to the stack. This can be used to offset the content horizontally in the stack.
     * Parameters¶
     * length
     * number
     * Length of the spacer. Pass null to create a spacer with a flexible length.
     * Return value¶
     * WidgetSpacer
     * Spacer element.
     */
    addSpacer(length: number): WidgetSpacer

    /**
     * Add stack.Adds a stack to the widget. Stacks layout elements horizontally by default.
     * Return value¶
     * WidgetStack
     * Stack element.
     */
    addStack(): WidgetStack

    /**
     * Set padding.Sets the padding on each side of the stack.
     * Parameters¶
     * top
     * number
     * Padding on the top edge.
     * leading
     * number
     * Padding on the leading edge.
     * bottom
     * number
     * Padding on the bottom edge.
     * trailing
     * number
     * Padding on the trailing edge.
     */
    setPadding(top: number, leading: number, bottom: number, trailing: number)

    /**
     * Use the default padding.
     * Configure the stack to use the default padding. Any padding previously defined with setPadding() will be discarded.
     */
    useDefaultPadding()

    /**
     * Top aligns the content.
     * Specifies that content should be top aligned. This is the default.
     */
    topAlignContent()

    /**
     * Center aligns the content.
     * Specifies that content should be center aligned.
     */
    centerAlignContent()

    /**
     * Bottom aligns the content.
     * Specifies that content should be bottom aligned.
     */
    bottomAlignContent()

    /**
     * Layout elements horizontally.
     * Specifies that the stack should layout elements horizontally. This is the default.
     */
    layoutHorizontally()

    /**
     * Layout elements vertically.
     * Specifies that the stack should layout elements vertically.
     */
    layoutVertically()
  } /** ---------WidgetText --------
  Text element shown in a widget.
A text shown in a widget. You do not create instances of this element directly. Instead you should call addText() on an instance of a ListWidget.

---------WidgetText --------
*/
  class WidgetText {
    /**
     * Text to show in a widget.
     */
    text: string

    /**
     * Color of the text.
     */
    textColor: Color

    /**
     * Font and text size of the text.
     */
    font: Font

    /**
     * Opacity of the text.
     * Opacity of the text. This must be a value between 0 and 1. Defaults to 1.
     */
    textOpacity: number

    /**
     * Maximum number of lines.
     * Maximum number of lines to display. The limit is disabled when the value is 0 or less. Defaults to 0.
     */
    lineLimit: number

    /**
     * Minimum amount the text scales down to.
     * Sets the minimum amount that text scales down to fit in the available space. For example, a text with a minimum scale factor of 0.5 allows the widget to draw the text in a font size half the size of the actual font. The scale factor should be a fraction between 0 and 1, both inclusive. Defaults to 1.
     */
    minimumScaleFactor: number

    /**
     * Color of the shadow.
     * Sets the color of the shadow cast by the text. The shadowRadius property must have a value greater than zero for this property to have an effect. Defaults to black.
     */
    shadowColor: Color

    /**
     * Size of the shadow.
     * Sets the size of the shadow cast by the text. Defaults to 0.
     */
    shadowRadius: number

    /**
     * Offset of the shadow.
     * Sets the offset of the shadow cast by the text. The shadowRadius property must have a value greater than zero for this property to have an effect. Defaults to (0, 0).
     */
    shadowOffset: Point

    /**
     * URL to open.
     * The URL will be opened when the text is tapped. This is only supported in medium and large widgets. Small widgets can only have a single tap target, which is specified by the url on the widget.
     */
    url: string

    /**
     * Left aligns the text.
     * Specifies that text should be left aligned. This is the default.
     * This does not affect texts placed in stacks. Use spacers instead when aligning text in stacks. To align the text to left right in a horizontal stack, you should place a spacer after the text.
     */
    leftAlignText()

    /**
     * Center aligns the text.
     * Specifies that text should be center aligned.
     * This does not affect texts placed in stacks. Use spacers instead when aligning text in stacks. To align the text in the center of a horizontal stack, you should place a spacer both before and after the text.
     */
    centerAlignText()

    /**
     * Right aligns the text.
     * Specifies that text should be right aligned.
     * This does not affect texts placed in stacks. Use spacers instead when aligning text in stacks. To align the text to the right in a horizontal stack, you should place a spacer before the text.
     */
    rightAlignText()
  } /** ---------XMLParser --------
  Event driven XML parser.
The XMLParser is an event driven XML parser that calls provided callback functions when it encounters elements to be parsed. It does not iself do any parsing.

---------XMLParser --------
*/
  class XMLParser {
    /**
     * XML string to be parsed.
     */
    string: string

    /**
     * Function called when the parser begins parsing a document.
     */
    didStartDocument()

    /**
     * Function called when the parser ends parsing a document.
     * When the parser calls the function, it has successfully completed parsing the document.
     */
    didEndDocument()

    /**
     * Function called when starting to parse an element.
     * Called by the parser when it encounters a start tag for an element. The function takes the element name as a parameter as well as a key value pair containing all the attributes associated with the element.
     * Use this function to update your state and prepare for receiving the characters of the element. After this function is called, the parser will call the foundCharacters callback function with all or parts of the characters of the element.
     */
    didStartElement(msg: string, info: Record<string, string>)

    /**
     * Function called when ended parsing an element.
     * Called by the parser when it encounters an end tag for an element. The function takes the element name as a parameter.
     */
    didEndElement(str: string)

    /**
     * Function called when the parser finds characters of an element.
     * The parser calls this function with a string whenever it finds characters for the current element. This function may be called several times for a single element.
     */
    foundCharacters(str: string)

    /**
     * Function called when the parser encounters an error.
     * The parser will call this function when it encounters a fatal error preventing it from continuing to parse. When the function is called the parsing is stopped.
     */
    parseErrorOccurred(str: string)

    /**
     * Constructs an XMLParser.Constructs an event driven XML parser. It does not do any parsing on its own and therefore the callback functions must be set before starting to parse.
     * Parameters¶
     * string
     * string
     * XML string to be parsed.
     */
    constructor(string: string)

    /**
     * Starts parsing.Before calling this function you should ensure that the parser is correctly configured, i.e. the necessary callback functions should be set.
     * Return value¶
     * bool
     * Whether parsing was successfully started.
     */
    parse(): boolean
  }
}
