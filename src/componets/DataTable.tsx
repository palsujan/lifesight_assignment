import { useState, useMemo, useCallback } from "react";
import { Input } from "./InputData";
import Dropdown from "./DropData";
import { Button } from "./Button";

export const  DataTable =({ data }: any) => {
  const [page, setPage] = useState(1);
  const [channelFilter, setChannelFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [sortKey, setSortKey] = useState("spend");
  const [sortDir, setSortDir] = useState("desc");

  const pageSize = 20;


  const regions = useMemo(
    () =>
      [...new Set(data.map((d: any) => d.region))].map((r: any) => ({
        label: r,
        value: r,
      })),
    [data]
  );

  const regionOptions = useMemo(() => [{ label: "All regions", value: "" }, ...regions], [regions]);

  const filtered = useMemo(() => {
    return data.filter((row: any) => {
      const channelMatch = row.channel
        .toLowerCase()
        .includes(channelFilter.toLowerCase());
      const regionMatch = regionFilter ? row.region === regionFilter : true;
      return channelMatch && regionMatch;
    });
  }, [data, channelFilter, regionFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const isNum = typeof aVal === "number";
      const result = isNum ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? result : -result;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = useMemo(() => Math.ceil(sorted.length / pageSize), [sorted.length, pageSize]);
  const start = useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const paged = useMemo(() => sorted.slice(start, start + pageSize), [sorted, start, pageSize]);

  const totals = useMemo(
    () =>
      filtered.reduce(
        (acc: any, row: any) => ({
          spend: acc.spend + row.spend,
          conversions: acc.conversions + row.conversions,
          clicks: acc.clicks + row.clicks,
          impressions: acc.impressions + row.impressions,
        }),
        { spend: 0, conversions: 0, clicks: 0, impressions: 0 }
      ),
    [filtered]
  );

  const ctr = useMemo(() => (totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0), [totals]);

  const handleSort = useCallback(
    (key: any) => {
      if (sortKey === key) {
        setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortKey]
  );

  const handleChannelChange = useCallback((e: any) => {
    setChannelFilter(e.target.value);
    setPage(1);
  }, []);

  const handleRegionChange = useCallback((val: any) => {
    setRegionFilter(val);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setChannelFilter("");
    setRegionFilter("");
    setPage(1);
  }, []);

  return (
    <div className="ls-container">
      <div className="ls-filter-bar">
        <Input
          label="Filter by channel"
          placeholder="e.g. TikTok"
          value={channelFilter}
          error=""
          onChange={handleChannelChange}
        />
        <Button
          variant="secondary"
          onClick={() => {
            handleClearFilters();
          }}
        >
          Clear filters
        </Button>
      </div>

      <div className="ls-stats">
        <div>Total Spend: {totals.spend.toFixed(2)}</div>
        <div>Total Conversions: {totals.conversions}</div>
        <div>Total CTR: {ctr.toFixed(2)}%</div>
        <div>Rows: {filtered.length}</div>
      </div>

      <table className="ls-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID ⇅</th>
            <th onClick={() => handleSort("channel")}>Channel ⇅</th>
            <th>
              <div className="ls-region-header">
                <div className="ls-region-label" onClick={() => handleSort("region")}>Region ⇅</div>
                <div className="ls-region-dropdown">
                  <Dropdown
                    options={regionOptions}
                    value={regionFilter}
                    onChange={handleRegionChange}
                    placeholder="All regions"
                  />
                </div>
              </div>
            </th>
            <th onClick={() => handleSort("spend")}>Spend ⇅</th>
            <th onClick={() => handleSort("impressions")}>Impressions ⇅</th>
            <th onClick={() => handleSort("clicks")}>Clicks ⇅</th>
            <th onClick={() => handleSort("conversions")}>Conversions ⇅</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((row) => (
            <tr
              key={row.id ?? `${row.channel}-${row.region}-${row.impressions}-${row.clicks}`}
            >
              <td>{row.id}</td>
              <td>{row.channel}</td>
              <td>{row.region}</td>
              <td>{row.spend}</td>
              <td>{row.impressions}</td>
              <td>{row.clicks}</td>
              <td>{row.conversions}</td>
            </tr>
          ))}
          {paged.length === 0 && (
            <tr>
              <td colSpan={7}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="ls-pagination">
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button variant="secondary" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </Button>
        <Button
          variant="secondary"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => Math.min(totalPages || 1, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
