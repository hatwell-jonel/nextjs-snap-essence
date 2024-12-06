# Snap Photography

## SWR Syntax and Configuration Options

### SWR Syntax
- **param1**: Endpoint URL (string or function that returns a string).
- **param2**: Fetcher function (usually an API call, for example using Axios).
- **param3**: Options object (optional, for controlling behavior like revalidation, retries, etc.).

## Common Configuration Options

### 1. `refreshInterval`
- **Description**: Specifies how often the data should be re-fetched in milliseconds. This is useful for polling or live-updating data.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { refreshInterval: 10000 });
    ```

### 2. `revalidateOnFocus`
- **Description**: When set to `true`, SWR will re-fetch the data when the window or tab regains focus. This is useful for showing fresh data when the user returns to the app.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { revalidateOnFocus: true });
    ```

### 3. `revalidateOnReconnect`
- **Description**: When `true`, SWR will re-fetch the data when the internet connection is restored after being lost.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { revalidateOnReconnect: true });
    ```

### 4. `revalidateOnMount`
- **Description**: Refetches the data when the component mounts. This is enabled by default, so it's typically not necessary to set this manually unless you want to override behavior.
- **Example**: This is the default behavior for SWR. You do not typically need to explicitly set it.

### 5. `dedupingInterval`
- **Description**: Specifies how often requests to the same key will be deduplicated in milliseconds. SWR deduplicates requests to the same key that occur within this time window to prevent unnecessary network requests.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { dedupingInterval: 2000 });
    ```

### 6. `shouldRetryOnError`
- **Description**: A boolean value specifying whether SWR should automatically retry the fetch when an error occurs.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { shouldRetryOnError: true });
    ```

### 7. `onSuccess`
- **Description**: A callback function that is invoked when the data fetch is successful.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { onSuccess: (data) => console.log(data) });
    ```

### 8. `onError`
- **Description**: A callback function that is invoked when the data fetch fails.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { onError: (error) => console.log(error) });
    ```

### 9. `onErrorRetry`
- **Description**: A function that can be used to control retry behavior when an error occurs.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 5000); // Retry every 5 seconds
      }
    });
    ```

### 10. `mutate`
- **Description**: This allows you to manually update the cache for a given key. It's commonly used for optimistic UI updates.
- **Example**:
    ```javascript
    import { mutate } from 'swr';
    mutate('/api/data', updatedData);
    ```

### 11. `cache`
- **Description**: Specifies a custom cache for SWR. By default, SWR uses an in-memory cache, but you can provide your own cache implementation.
- **Example**:
    ```javascript
    const customCache = new Map();
    const { data, error } = useSWR('/api/data', fetcher, { cache: customCache });
    ```

### 12. `suspense`
- **Description**: When set to `true`, SWR will throw a promise to be handled by React's Suspense, which lets you wait for data before rendering the component.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { suspense: true });
    ```

### 13. `initialData`
- **Description**: Specifies the initial data to use before the data is fetched. This can be useful when you already have some data to show when the component first renders.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { initialData: [] });
    ```

### 14. `cacheTime`
- **Description**: Specifies the time in milliseconds for how long the data should be cached. By default, data is cached for 5 minutes.
- **Example**:
    ```javascript
    const { data, error } = useSWR('/api/data', fetcher, { cacheTime: 10000 }); // Cache data for 10 seconds
    ```

---

## Use Cases

### 1. Basic Usage
```javascript
const { data, error } = useSWR('/api/data', fetcher);
```

### 2. Passing URL and Parameters
```javascript
const params = { per_page: 10, query: 'nature' }; // Example query parameters
useSWR(['/photos', params], fetcher); // Pass both URL and params
```

### 3. Passing URL and Parameters
```javascript
useSWR(
  () => {
    if (query) {
      return `/search/photos?query=${query}&per_page=${count}`;
    } else {
      return `/photos?per_page=${count}`;
    }
  },
  fetcher
);
```
[SWR documentation](https://swr.vercel.app/) for more details.